let synth = window.speechSynthesis
let sentences = []
let currentIndex = 0
let playing = false
let rateList = [1, 1.5, 2, 2.5, 3]
let rateIndex = 0
let rate = 1

function splitText (text) {
    return text
        .replace(/\n/g, " ")
        .split(/(?<=[。！？.!?])/)
        .filter(t => t.trim().length > 0)
}

function getArticle () {
    return document.getElementById("article-content")
}

function ttsPlay (btn) {
    const article = getArticle()
    if (!article) {
        alert("Article not found")
        return
    }
    setActive(btn)
    const text = article.innerText
    sentences = splitText(text)
    currentIndex = 0
    playing = true
    speakNext()
}

function speakNext () {
    if (!playing || currentIndex >= sentences.length) {
        return
    }
    const sentence = sentences[currentIndex]

    highlightSentence(sentence)
    const msg = new SpeechSynthesisUtterance(sentence)

    msg.lang = "zh-CN"
    msg.rate = rate

    msg.onend = () => {
        currentIndex++
        speakNext()
    }
    synth.speak(msg)
}

function ttsChangeSpeed () {
    rateIndex++
    if (rateIndex >= rateList.length) {
        rateIndex = 0
    }
    rate = rateList[rateIndex]
    const btn = document.querySelector(".tts-speed-btn")
    if (btn) {
        btn.innerText = "Speed: " + rate + "x"
    }
}

function ttsPause (btn) {
    setActive(btn)
    synth.pause()
}

function ttsResume (btn) {
    setActive(btn)
    synth.resume()
}

function ttsStop (btn) {
    setActive(btn)
    playing = false
    synth.cancel()
}

function ttsSetRate (r) {
    rate = r
}

function highlightSentence (sentence) {
    const article = getArticle()
    const html = article.innerHTML
    const newHtml = html.replace(
        sentence,
        `<span class="tts-highlight">${sentence}</span>`
    )

    article.innerHTML = newHtml
    const el = document.querySelector(".tts-highlight")

    if (el) {
        el.scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    }
}

function setActive(btn){
  document.querySelectorAll(".tts-btn").forEach(b=>{
    b.classList.remove("active")
  })
  btn.classList.add("active")
}