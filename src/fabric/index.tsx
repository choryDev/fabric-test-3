import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const App = () => {
  const [canvas, setCanvas] = useState<any>();
  const initCanvas = () => {
    const canvas: any = new fabric.Canvas("canvas", {
      height: 800,
      width: 800,
      backgroundColor: "#eee"
    });
    canvas.state = [];
    canvas.index = 0;
    canvas.stateaction = true;
    return canvas;
  };

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  const removeObjects = () => {
    var activeObject = canvas.getActiveObject();
    if (!activeObject) return;
    if (activeObject.type === "activeSelection") {
      activeObject.forEachObject((object: any) => {
        canvas.remove(object);
      });
    } else {
      canvas.remove(activeObject);
    }
  };

  const undo = () => {
    canvas.stateaction = false;
    var index = canvas.index;
    var state = canvas.state;
    console.log(index);
    if (index > 0) {
      index -= 1;
      removeObjects();
      canvas.loadFromJSON(state[index], function () {
        canvas.renderAll();
        canvas.stateaction = true;
        canvas.index = index;
      });
    } else {
      canvas.stateaction = true;
    }
  };

  const addRect = () => {
    var rect = new fabric.Rect({
      // left: 100,
      // top: 100,
      fill: "red",
      width: 100,
      height: 100,
      selectable: true
    });
    canvas.add(rect);
  };

  const addCircle = () => {
    var rect = new fabric.Circle({
      // left: 100,
      // top: 100,
      fill: "red",
      radius: 30,
      selectable: true
    });
    canvas.add(rect);
  };

  const addTextBox = () => {
    var text = new fabric.Textbox("Testing Fabric Js Textbox", {
      selectable: true
    });
    canvas.add(text);
  };

  const readImage = (e: any) => {
    var file = e.target.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = function (f: any) {
      var data = f.target.result;
      fabric.Image.fromURL(data, function (img: any) {
        var oImg = img.set({
          left: 0,
          top: 0,
          angle: 0
        });
        canvas.add(oImg).renderAll();
        canvas.centerObject(oImg);
        // var a = canvas.setActiveObject(oImg);
        // var dataURL = canvas.toDataURL({ format: "png", quality: 0.8 });
      });
    };
    reader.readAsDataURL(file);
  };

  const deleteObject = () => {
    canvas.remove(canvas.getActiveObject());
  };

  function addSelectionRect() {
    var rectangle = new fabric.Rect({
      fill: "red",
      width: 100,
      height: 100,
      stroke: "#ccc",
      strokeDashArray: [2, 2]
    });
    canvas.centerObject(rectangle);
    canvas.add(rectangle);
  }

  const saveAsImage = (format: string) => {
    const dataURL = canvas.toDataURL({
      width: canvas.width,
      height: canvas.height,
      left: 0,
      top: 0,
      format: format
    });
    const link = document.createElement("a");
    link.download = `image.${format}`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const loadFromJSON = () => {
    var json =
      '{"version":"4.6.0","objects":[{"type":"rect","version":"4.6.0","originX":"left","originY":"top","left":131,"top":325,"width":100,"height":100,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","version":"4.6.0","originX":"left","originY":"top","left":365,"top":79,"width":60,"height":60,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":30,"startAngle":0,"endAngle":6.283185307179586},{"type":"textbox","version":"4.6.0","originX":"left","originY":"top","left":0,"top":0,"width":450,"height":45.2,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Times New Roman","fontWeight":"normal","fontSize":40,"text":"Testing Fabric Js Textbox","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":{},"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","minWidth":20,"splitByGrapheme":false}],"background":"#eee"}';

    canvas.loadFromJSON(json, canvas.renderAll.bind(canvas));
  };

  const saveAsJson = () => {
    console.log(JSON.stringify(canvas));
  };

  return (
    <div>
      <h1>Testing Fabric JS</h1>
      <button onClick={addRect}>Add Rectangle</button>
      <button onClick={addCircle}>Add Cirlce</button>
      <button onClick={addTextBox}>Add Text</button>
      <button onClick={deleteObject}>Delete</button>
      <button onClick={addSelectionRect}>Crop</button>
      <button onClick={undo}>Undo</button>
      <button onClick={() => saveAsImage("png")}>Save as png</button>
      <button onClick={() => saveAsImage("jpeg")}>Save as jpeg</button>
      {/* <button onClick={loadFromJSON}>Load From Json</button>
      <button onClick={saveAsJson}>Save as Json</button> */}
      <input type="file" id="file" onChange={readImage} />
      <canvas id="canvas" />
    </div>
  );
};

export default App;
