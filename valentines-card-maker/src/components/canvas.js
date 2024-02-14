import { useState, createRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { IndividualSticker } from "./sticker";
import { Background } from "./background";
import { TextBox } from "./text-box";
import { backgroundsData, stickersData, bordersData } from "../file-data";

function Canvas(props) {
    let [background, setBackground] = useState("backgrounds/bg_blueheart.png")
    let [border, setBorder] = useState("border/border_heartlace_blue.png")
    const [text, setText] = useState("Enter text...");
    const [toText, setTo] = useState("To:");
    const [fromText, setFrom] = useState("From:");
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(30);
    const [toWidth, setToWidth] = useState(50);
    const [toHeight, setToHeight] = useState(30);
    const [fromWidth, setFromWidth] = useState(75);
    const [fromHeight, setFromHeight] = useState(30);
    const [selected, setSelected] = useState(false);


    const separateStickers = (arr) => {
        var separateElements = [];
        for (var i = 0; i < arr.length; i += 15) {
            var oneRow = [];
            oneRow.push(arr.slice(i, i + 15).map(item => {
                return <div key={item.url} style={{ display: 'inline-block' }}>{
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
            separateElements.push(oneRow.map(itm => { return <div key={itm}>{itm}</div> }))
        }
        return separateElements;
    }
    const separateBgs = (arr) => {
        var separateElements = [];
        for (var i = 0; i < arr.length; i += 4) {
            var oneRow = [];
            oneRow.push(arr.slice(i, i + 4).map(background => {
                return <div key={background.url} style={{ display: 'inline-block' }}>{
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
            separateElements.push(oneRow.map(itm => { return <div key={itm}>{itm}</div> }))
        }
        return separateElements;
    }
    const separateBorders = (arr) => {
        var separateElements = [];
        for (var i = 0; i < arr.length; i += 6) {
            var oneRow = [];
            oneRow.push(arr.slice(i, i + 6).map(border => {
                return <div key={border.url} style={{ display: 'inline-block' }}>{
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
            separateElements.push(oneRow.map(itm => { return <div key={itm}>{itm}</div> }))
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
        <>

            <div class="row"><div class="canvas">
                <div class="title">
                    <h1>{`Valentine's`} Pixel Card Maker 2024!!</h1>
                    <h2>Art by Moaw!</h2>
                    <h2>Code by synanasthesia</h2>
                    <h3>Pre-alpha edition</h3>
                </div>
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
                        <TextBox
                                x={100}
                                y={100}
                                text={toText}
                                onTextChange={(value) => setTo(value)}
                                width={toWidth}
                                height={toHeight}
                                selected={selected}
                                onTextResize={(newWidth, newHeight) => {
                                    setToWidth(newWidth);
                                    setToHeight(newHeight);
                                }}
                                onClick={() => {
                                    setSelected(!selected);
                                }}
                                onTextClick={(newSelected) => {
                                    setSelected(newSelected);
                                }}
                            />
                            <TextBox
                                x={300}
                                y={300}
                                text={fromText}
                                onTextChange={(value) => setFrom(value)}
                                width={fromWidth}
                                height={fromHeight}
                                selected={selected}
                                onTextResize={(newWidth, newHeight) => {
                                    setFromWidth(newWidth);
                                    setFromHeight(newHeight);
                                }}
                                onClick={() => {
                                    setSelected(!selected);
                                }}
                                onTextClick={(newSelected) => {
                                    setSelected(newSelected);
                                }}
                            />
                        <div class="black-font">
                            <TextBox
                                x={200}
                                y={200}
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
                    <h2>Select a background:</h2>
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
                        <h2>Select a border:</h2>
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
                        <h2>Add some stickers:</h2>
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