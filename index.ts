const run = (root: HTMLDivElement, parent?: HTMLElement) => {
  const items = [...root.querySelector('.list')?.childNodes || []]
    .filter(e => e instanceof HTMLLIElement) as HTMLLIElement[]

  for (let item of items) {
    const ctrl = document.createElement('div')
    const toggleBtn = document.createElement('button')
    const content = item.querySelector('.content') as HTMLDivElement
    const children = item.querySelector('.children') as HTMLDivElement
    const textarea = content.querySelector('textarea')
    const { offsetWidth, offsetHeight } = textarea
    const last = { offsetWidth, offsetHeight }

    const top = document.createElement('div')
    const left = document.createElement('div')
    const isLast = parent?.querySelector('ul')?.lastElementChild == item

    const move = () => {
      const { offsetWidth, offsetHeight } = textarea

      if (
        last.offsetWidth != offsetWidth ||
        last.offsetHeight != offsetHeight
      ) {
        last.offsetWidth = offsetWidth
        last.offsetHeight = offsetHeight
        document.body.dispatchEvent(new Event('resize'))
      }
    }

    const update = () => {
      if (!parent && !isLast) return
      const pContent = parent.querySelector('.content') as HTMLDivElement
      const { offsetHeight: pHeight } = pContent
      const { offsetHeight: height } = content
      
      let nItem = item
      let size = pHeight / 2 + height / 2

      while(nItem?.previousElementSibling) {
        nItem = nItem.previousElementSibling as any

        if(nItem instanceof HTMLElement) {
          size += nItem.offsetHeight
        }
      }

      top.style.top = `-${size}px`
      top.style.height = `${size}px`
    }

    ctrl.classList.add('control')
    left.classList.add('left')
    if(isLast) top.classList.add('top')

    document.body.addEventListener('resize', () => {
      parent && isLast && update()
    })

    if (parent) {
      ctrl.appendChild(left)

      if(isLast)
        left.appendChild(top)

      update()
    }

    window.addEventListener('mousemove', move)

    ctrl.appendChild(toggleBtn)

    content.appendChild(ctrl)

    if(parent)
      textarea.innerText = parent.querySelector('p').innerText
    

    if (children instanceof HTMLDivElement)
      run(children, item)
  }
}

for (let tree of document.querySelectorAll('.tree'))
  run(tree as HTMLDivElement)


