// ==UserScript==
// @name         DeltaMath RPC Client
// @namespace    https://pikarocks.dev
// @version      1.2
// @description  Connects to a DeltaMath RPC server for Discord rich presence.
// @author       pikapower9080
// @match        https://www.deltamath.com/app/student/*
// @icon         https://twemoji.pikarocks.dev/emojis/1f393.svg
// @grant        none
// ==/UserScript==

let lastData

const ws = new WebSocket("ws://localhost:3000");

const scoreRegex = /Score: ([0-9]+)\/([0-9]+)/
let lastIdleTimestamp

ws.onopen = () => {
	console.log("🎓 Connected to DeltaMath RPC Server")
	setInterval(() => {
		const gradeLabel = document.querySelector("#root > div.flex.h-full.flex-col > div > div.flex-shrink-0.border-r.border-dm-charcoal-100.bg-white.lg\\:w-1\\/4 > div > nav > div.relative.flex.h-full.flex-col > div.mb-1.shrink-0 > div > div.flex.justify-between.text-sm.leading-5 > h4 > span")
		const completionLabel = document.querySelector("div.flex:nth-child(4) > h4:nth-child(2) > span:nth-child(1)")
		const sectionLabel = document.querySelector("#main-content > div.flex.justify-between.gap-x-1.border-dm-charcoal-100.px-3.pb-4.pt-3.max-sm\\:flex-col.max-sm\\:border-b.max-sm\\:bg-white.sm\\:px-0.sm\\:pb-8.sm\\:pt-0 > div.flex.min-w-0.flex-nowrap.items-start.gap-x-1.max-sm\\:flex-col.max-sm\\:gap-y-2.max-sm\\:truncate.sm\\:items-center.md\\:gap-x-3 > h1")
		const scoreLabel = document.querySelector("#main-content > div.mb-4.flex.flex-col.gap-x-6.gap-y-2.border-dm-charcoal-100.bg-white.px-3.py-2\\.5.max-sm\\:order-first.max-sm\\:border-b.sm\\:rounded-lg.sm\\:border.sm\\:px-6.sm\\:py-4 > div.flex.flex-row.gap-x-6.text-sm.max-sm\\:justify-between > div.flex.gap-x-1\\.5.font-semibold.text-dm-charcoal-800")

		if (!document.hasFocus()) {
			if (lastIdleTimestamp === undefined) {
				lastIdleTimestamp = Date.now()
			}
			if (Date.now() - lastIdleTimestamp > 60000) {
				if (lastData !== JSON.stringify({ idle: true })) {
					lastData = JSON.stringify({ idle: true })
					console.log("🎓 Pushing updates")
					ws.send(JSON.stringify({ idle: true }))
				}
			}
			return
		}

		lastIdleTimestamp = undefined

		if ((gradeLabel || completionLabel) && sectionLabel && scoreLabel) {
			let grade = completionLabel ? completionLabel.innerText : gradeLabel.innerText
			const data = {
				grade,
				section: sectionLabel.innerText,
				score: scoreLabel.innerText.match(scoreRegex).splice(1, 2),
				idle: false
			}
			if (lastData !== JSON.stringify(data)) {
				lastData = JSON.stringify(data)
				console.log("🎓 Pushing updates")
				ws.send(JSON.stringify(data))
			}
		}
	}, 1000);
}

ws.onerror = () => {
	console.warn("🎓 Could not connect to the RPC server, is it running?")
}

console.log("🎓 Loaded DeltaMath RPC Client")