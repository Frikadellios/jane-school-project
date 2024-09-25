import { useEffect } from 'react'

const useCanvasCursor = () => {
  let ctx
  let f
  const pos = {}
  let lines = []
  const E = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98
  }

  function n(e) {
    this.init(e || {})
  }
  n.prototype = {
    init: function (e) {
      this.phase = e.phase || 0
      this.offset = e.offset || 0
      this.frequency = e.frequency || 0.001
      this.amplitude = e.amplitude || 1
    },
    update: function () {
      this.phase += this.frequency
      return this.offset + Math.sin(this.phase) * this.amplitude
    },
    value: function () {
      return this.offset + Math.sin(this.phase) * this.amplitude
    }
  }

  function Line(e) {
    this.init(e || {})
  }

  Line.prototype = {
    init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02
      this.friction = E.friction + 0.01 * Math.random() - 0.002
      this.nodes = []
      for (let n = 0; n < E.size; n++) {
        const t = new Node()
        t.x = pos.x
        t.y = pos.y
        this.nodes.push(t)
      }
    },
    update: function () {
      const springConstant = this.spring
      const firstNode = this.nodes[0]
      firstNode.vx += (pos.x - firstNode.x) * springConstant
      firstNode.vy += (pos.y - firstNode.y) * springConstant
      for (let i = 0; i < this.nodes.length; i++) {
        const currentNode = this.nodes[i]
        if (i > 0) {
          const previousNode = this.nodes[i - 1]
          currentNode.vx += (previousNode.x - currentNode.x) * springConstant
          currentNode.vy += (previousNode.y - currentNode.y) * springConstant
          currentNode.vx += currentNode.vx * E.dampening
          currentNode.vy += currentNode.vy * E.dampening
          currentNode.vx *= this.friction
          currentNode.vy *= this.friction
          currentNode.x += currentNode.vx
          currentNode.y += currentNode.vy
        }
      }
    },
    draw: function () {
      let e
      let t
      let n = this.nodes[0].x
      let i = this.nodes[0].y
      ctx.beginPath()
      ctx.moveTo(n, i)
      for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
        e = this.nodes[a]
        t = this.nodes[a + 1]
        n = 0.5 * (e.x + t.x)
        i = 0.5 * (e.y + t.y)
        ctx.quadraticCurveTo(e.x, e.y, n, i)
      }
      e = this.nodes[a]
      t = this.nodes[a + 1]
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y)
      ctx.stroke()
      ctx.closePath()
    }
  }

  function onMousemove(e) {
    function o() {
      lines = []
      for (let e = 0; e < E.trails; e++) lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }))
    }
    function c(e) {
      e.touches
        ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
        : ((pos.x = e.clientX), (pos.y = e.clientY)),
        e.preventDefault()
    }
    function l(e) {
      1 === e.touches.length && ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
    }
    document.removeEventListener('mousemove', onMousemove),
      document.removeEventListener('touchstart', onMousemove),
      document.addEventListener('mousemove', c),
      document.addEventListener('touchmove', c),
      document.addEventListener('touchstart', l),
      c(e),
      o(),
      render()
  }

  function render() {
    if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = `hsla(${Math.round(f.update())},50%,50%,0.2)`
      ctx.lineWidth = 1
      for (let t = 0; t < E.trails; t++) {
        const e = lines[t]
        e.update()
        e.draw()
      }
      ctx.frame++
      window.requestAnimationFrame(render)
    }
  }

  function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20
    ctx.canvas.height = window.innerHeight
  }

  function Node() {
    this.x = 0
    this.y = 0
    this.vy = 0
    this.vx = 0
  }

  const renderCanvas = () => {
    ctx = document.getElementById('canvas').getContext('2d')
    ctx.running = true
    ctx.frame = 1
    f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285
    })
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('touchstart', onMousemove)
    document.body.addEventListener('orientationchange', resizeCanvas)
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('focus', () => {
      if (!ctx.running) {
        ctx.running = true
        render()
      }
    })
    window.addEventListener('blur', () => {
      ctx.running = false
    })
    resizeCanvas()
  }

  useEffect(() => {
    renderCanvas()

    return () => {
      ctx.running = false
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('touchstart', onMousemove)
      document.body.removeEventListener('orientationchange', resizeCanvas)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('focus', () => {
        if (!ctx.running) {
          ctx.running = true
          render()
        }
      })
      window.removeEventListener('blur', () => {
        ctx.running = false
      })
    }
  }, [])
}

export default useCanvasCursor
