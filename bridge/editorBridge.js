class HtmlPainter{
  constructor(container){
    this.container = container;
    this.width = '1px';
    this.height = '1px';
    this.color = '#000000';
  }
  setWidth(width){
    this.width = width + 'px';
  }
  setHeight(height){
    this.height = height + 'px';
  }
  setColor(color){
    this.color = color ;
  }
  print() {
    this.container.innerHTML = `
      <div
        style="width:${this.width}; height:${this.height}; background:${this.color};"
      >
      </div>
    `
  }
}

class CanvasPainter{
  constructor(container){
    this.container = container;
    this.ctx = container.getContext("2d");
    this.width = 1;
    this.height = 1;
    this.color = '#000000';
  }
  setWidth(width){
    this.width = width;
  }
  setHeight(height){
    this.height = height;
  }
  setColor(color){
    this.color = color ;
  }
  print() {
    this.ctx.clearRect(0,0, this.container.width, this.container.height);
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(0,0, this.width, this.height);
  }
}

class Editor {
  constructor(implementor){
    this.implementor = implementor;
  }

  print(width, height, color) {
    this.implementor.setWidth(width);
    this.implementor.setHeight(height);
    this.implementor.setColor(color);
    this.implementor.print();
  }

}

class EditorWithClear extends Editor {
  constructor(implementor){
    super(implementor)
  }

  clear() {
    this.implementor.setWidth(0);
    this.implementor.setHeight(0);
    this.implementor.print();
  }
}

//const editor = new Editor(new HtmlPainter(content));
//const editor = new Editor(new CanvasPainter(canvas));

const editor = new EditorWithClear(new CanvasPainter(canvas));

range.addEventListener('input', (e) => {
  const width = e.target.value;
  const height = e.target.value;
  const color =editColor.value;
  editor.print(width, height, color);
  console.log('entro')
});

editColor.addEventListener('input', (e) => {
  const width = range.value;
  const height = range.value;
  const color = e.target.value;
  editor.print(width, height, color);
});

clear.addEventListener('click', (e) => {
  editor.clear();
});

