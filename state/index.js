class DocumentContext {
  constructor(){
    this.content = '';
    this.state = new BlankState();
  }

  setState(state){
    this.state = state;
  }

  write(text) {
    this.state.write(this, text)
  }
}

// States
class BlankState {
  write(documentContext, text) {
    documentContext.content = text;
    documentContext.setState(new WithContentState());
  }
}

class WithContentState {
  write(documentContext, text) {
    documentContext.content += ' ' + text;
    documentContext.setState(new WithContentState());
  }
}

class ApprovedState {
  write(documentContext, text) {
    console.error('Approved, you can NOT modify it');
  }
}

const doc = new  DocumentContext();
console.log(doc.state);
doc.write('example');
console.log(doc.content);
console.log(doc.state);
doc.write('1');
doc.write('2');
console.log(doc.content);

doc.setState(new ApprovedState());
console.log(doc.state);
doc.write('3');
console.log(doc.content);
doc.setState(new WithContentState());
console.log(doc.state);
doc.write('4');
console.log(doc.content);