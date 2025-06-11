"use client"

import React, { useEffect, useRef } from "react"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  let flickerTimer = 0

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let particlesArray: any[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    window.addEventListener("resize", resize)
    resize()

    function Particle(x: number, y: number, dx: number, dy: number, size: number, color: string) {
      this.x = x
      this.y = y
      this.dx = dx
      this.dy = dy
      this.size = size
      this.color = color

      this.draw = function () {
        ctx?.beginPath()
        ctx!.shadowBlur = 25
        ctx!.shadowColor = "#000000"
        ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
        ctx!.fillStyle = this.color
        ctx?.fill()
      }

      this.update = function () {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy
        this.x += this.dx
        this.y += this.dy
        this.draw()
      }
    }

    function init() {
      particlesArray = []
      const numberOfParticles = (canvas.width * canvas.height) / 8000
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const dx = (Math.random() - 0.5) * 2
        const dy = (Math.random() - 0.5) * 2
        const blue = Math.floor(Math.random() * 130 + 120)
        const color = `rgba(0, ${blue}, 255, 0.8)`
        particlesArray.push(new (Particle as any)(x, y, dx, dy, size, color))
      }
    }

    function lightningFlash() {
      const now = Date.now()
      if (now - flickerTimer > 4000 + Math.random() * 3000) {
        canvas.style.filter = "brightness(2.5)"
        setTimeout(() => {
          canvas.style.filter = "brightness(1)"
        }, 100 + Math.random() * 200)
        flickerTimer = now
      }
    }

    function animate() {
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      particlesArray.forEach((p) => p.update())
      lightningFlash()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />
      <div className="container">
        <h1 className="main-title">BADDIES</h1>
        <h2 className="sub-title">THE #1 SITE</h2>

        <a href="https://discord.com/oauth2/authorize?client_id=..." className="site-button">Website</a>
        <a href="#" className="site-button">Hidelink</a>
        <a href="https://discord.gg/injurys" target="_blank" className="site-button">Join Discord</a>
      </div>
    </>
  )
}
