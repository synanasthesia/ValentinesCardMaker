import { useState, createRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { IndividualSticker } from "./sticker";
import { Background } from "./background";
import { TextBox } from "./text-box";
import { backgroundsData, stickersData, bordersData } from "../file-data";

function Canvas(props) {
    let [background, setBackground] = useState("backgrounds/bg_blueheart.png")
    let [border, setBorder] = useState("border/border_heartlace_blue.png")
    const [text, setText] = useState("Hello World!");
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [selected, setSelected] = useState(false);


    const separateStickers = (arr) => {
        var separateElements = [];
        for (var i = 0; i < arr.length; i += 15) {
            var oneRow = [];
            oneRow.push(arr.slice(i, i + 15).map(item => {
                return <div style={{ display: 'inline-block' }}>{
                    <button
                        className="button"
                        onMouseDown={() => {
                            // setBg();
                            addStickerToPanel({
                                src: item.url,
                                width: item.width,
                                x: 100,
                                y: 100
                            });
                        }}
                    >
                        <img alt={item.alt} src={item.url} width={item.width / 3} />
                    </button>
                }</div>
            }))
            separateElements.push(oneRow.map(itm => { return <div>{itm}</div> }))
        }
        return separateElements;
    }
    const separateBgs = (arr) => {
        var separateElements = [];
        for (var i = 0; i < arr.length; i += 4) {
            var oneRow = [];
            oneRow.push(arr.slice(i, i + 4).map(background => {
                return <div style={{ display: 'inline-block' }}>{
                    <button
                        className="button"
                        onMouseDown={() => {
                            // setBg();
                            setBackground(background.url)
                        }}
                    >
                        <img alt={background.alt} src={background.url} width={background.width / 6} />
                    </button>
                }</div>
            }))
            separateElements.push(oneRow.map(itm => { return <div>{itm}</div> }))
        }
        return separateElements;
    }
    const separateBorders = (arr) => {
        var separateElements = [];
        for (var i = 0; i < arr.length; i += 6) {
            var oneRow = [];
            oneRow.push(arr.slice(i, i + 6).map(border => {
                return <div style={{ display: 'inline-block' }}>{
                    <button
                        className="button"
                        onMouseDown={() => {
                            // setBg();
                            setBorder(border.url)
                        }}
                    >
                        <img alt={border.alt} src={border.url} width={border.width / 6} />
                    </button>
                }</div>
            }))
            separateElements.push(oneRow.map(itm => { return <div>{itm}</div> }))
        }
        return separateElements;
    }
    const [images, setImages] = useState([]);
    const addStickerToPanel = ({ src, width, x, y }) => {

        setImages((currentImages) => [
            ...currentImages,
            {
                width,
                x,
                y,
                src,
                resetButtonRef: createRef()
            }
        ]);
    };
    return (
        <> <div class="row"><div class="canvas">
            <Stage width={600} height={579} onClick={(e) => {
                if (e.currentTarget._id === e.target._id) {
                    setSelected(false);
                }
            }}>
                <Layer>
                    <Background image={background}></Background>
                    <Background image={border}></Background>

                    {images.map((image, i) => {
                        return (
                            <IndividualSticker
                                onDelete={() => {
                                    const newImages = [...images];
                                    newImages.splice(i, 1);
                                    setImages(newImages);
                                }}
                                onDragEnd={(event) => {
                                    image.x = event.target.x();
                                    image.y = event.target.y();
                                }}
                                key={i}
                                image={image}
                            />
                        );
                    })}
                    <div class="black-font">
                    <TextBox
                        x={50}
                        y={50}
                        text={text}
                        onTextChange={(value) => setText(value)}
                        width={width}
                        height={height}
                        selected={selected}
                        onTextResize={(newWidth, newHeight) => {
                            setWidth(newWidth);
                            setHeight(newHeight);
                        }}
                        onClick={() => {
                            setSelected(!selected);
                        }}
                        onTextClick={(newSelected) => {
                            setSelected(newSelected);
                        }}
                    />
                    </div>
                </Layer>
            </Stage>
        </div>
            <div class="selectors">
                <div class="backgrounds"></div>
                <h1>Select a background:</h1>
                {/* {backgroundsData.map((background) => {
                return (
                    <button
                        className="button"
                        onMouseDown={() => {
                            // setBg();
                            setBackground(background.url)
                        }}
                    >
                        <img alt={background.alt} src={background.url} width={background.width / 6} />
                    </button>
                );
            })} */}
                {separateBgs(backgroundsData)}
                <div class="borders">
                    <h1>Select a border:</h1>
                    {/* {bordersData.map((border) => {
                    return (
                        <button
                            className="button"
                            onMouseDown={() => {
                                // setBg();
                                setBorder(border.url)
                            }}
                        >
                            <img alt={border.alt} src={border.url} width={border.width / 6} />
                        </button>
                    );
                })} */}
                    {separateBorders(bordersData)}
                </div>
                <div class="stickers">
                    <h1>Add some stickers:</h1>
                    {/* {stickersData.map((sticker) => {
                    return (
                        <button
                            className="button"
                            onMouseDown={() => {
                                // setBg();
                                addStickerToPanel({
                                    src: item.url,
                                    width: item.width,
                                    x: 100,
                                    y: 100
                                });
                            }}
                        >
                            <img alt={item.alt} src={item.url} width={item.width / 3} />
                        </button>)
                })} */}
                    {separateStickers(stickersData)}
                </div>
            </div>
        </div></>
    );
}

export default Canvas;