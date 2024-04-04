interface Box {
    num: number,
    update: boolean
}
interface Window {
    Global: {
      score: number;
      arr: Box[][];
    };
  }
  
  window.Global = {
    score: 0,
    arr: null,
  };