import React from "react";
import TitleBar, { ButtonFunctions } from "./TitleBar/TitleBar";

const css = require('./DraggableWindow.css');
let classNames = require('classnames/bind');

interface Props extends ButtonFunctions {
    title: string;
    minWidth: number;
    minHeight: number;
    edgeDetectionRange: number;
    initialWidth: number;
    initialHeight: number;
    initialTop: number;
    initialLeft: number;
    children: any;
}

interface State {
    cursor: string;
}

interface ClickEvent {
    x           : number;
    y           : number;
    frameTop    : number;
    frameLeft   : number;
    boundingBox : ClientRect;
}

interface FrameRect {
    bottom? : number;
    height  : number;
    left?   : number;
    right?  : number;
    top?    : number;
    width   : number;
}

interface WindowRect {
    height  : string;
    left    : string;
    top     : string;
    width   : string;
}

interface HitEdges {
    left   : boolean;
    right  : boolean;
    top    : boolean;
    bottom : boolean;
}

const styles = {
    main     : 'DraggableWindow',
    content  : 'DraggableWindow__content'
}

let windowClass = classNames.bind(styles);

export default class DraggableWindow extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        
        this.state = {
            cursor: 'auto'
        };

        this.frame = React.createRef();
        this.title = React.createRef();
    }

    private mouseMoveListener = this.onMove.bind(this);
    private mouseUpListener = this.onUp.bind(this);

    onMove() {
        return (e: React.MouseEvent) : void => {
            this.checkCursorStatus(e)
            if (this.clicked !== null) {
                this.forceUpdate()
            }
        }
    }

    onUp() {
        return (e: React.MouseEvent) : void => {
            this.clicked = null
            this.checkCursorStatus(e)
        }
    }

    private frame: React.RefObject<HTMLDivElement>;
    private title: React.RefObject<HTMLDivElement>;

    public static defaultProps = {
        minWidth: 20,
        minHeight: 20,
        edgeDetectionRange: 4,
        initialWidth: null,
        initialHeight: null,
        initialTop: null,
        initialLeft: null
    }

    cursorX: number = 0;
    cursorY: number = 0;
    clicked: ClickEvent | null = null;
    allowTransition: boolean = false;
    frameRect: FrameRect = {} as FrameRect;
    prevState: FrameRect = {} as FrameRect;
    hitEdges : HitEdges = {} as HitEdges;
    windowRect: WindowRect = {} as WindowRect;

    componentDidMount() {
        const { initialWidth, initialHeight, initialTop, initialLeft } = this.props;

        const boundingBox = this.getFrameRect();
        this.frameRect.width = initialWidth || boundingBox.width;
        this.frameRect.height = initialHeight || boundingBox.height;
        this.frameRect.top = initialTop || this.frame.current!.offsetTop;
        this.frameRect.left = initialLeft || this.frame.current!.offsetLeft;

        window.addEventListener('mousemove', this.mouseMoveListener);
        window.addEventListener('mouseup', this.mouseUpListener);
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.mouseMoveListener);
      window.removeEventListener('mouseup', this.mouseUpListener);
    }

    private transform(state: FrameRect, allowTransition: boolean = true) {
        const boundingBox = this.getFrameRect();

        const top = this.frame.current!.offsetTop;
        const left = this.frame.current!.offsetLeft;
        const width = boundingBox.width;
        const height = boundingBox.height;

        this.prevState = {
            top: top,
            left: left,
            width: width,
            height: height
        }

        if (!state) return;

        this.frameRect.top = typeof state.top === 'number' ? state.top :
                                  state.bottom ? (state.bottom - (state.height || height)) : top;
        this.frameRect.left = typeof state.left === 'number' ? state.left :
                                    state.right ? (state.right - (state.width || width)) : left;
        this.frameRect.width = typeof state.width === 'number' ? state.width :
                                    (typeof state.right === 'number' && typeof state.left === 'number') ? state.right - state.left :
                                    typeof state.right === 'number' ? state.right - this.frameRect.left : width;
        this.frameRect.height = typeof state.height === 'number' ? state.height :
                                    (typeof state.bottom === 'number' && typeof state.top === 'number') ? state.top - state.bottom :
                                    typeof state.bottom === 'number' ? state.bottom - this.frameRect.top : height;
        this.allowTransition = allowTransition;
        this.forceUpdate();
    }

    restore(allowTransition = true) {
        this.transform(this.prevState, allowTransition)
    }

    minimize(allowTransition = true) {
        this.transform({width: 0, height: 0}, allowTransition)
    }
    
    maximize(allowTransition = true) {
        this.transform({top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}, allowTransition)
    }

    private getFrameRect(): ClientRect {
        return (this.frame.current) ? this.frame.current!.getBoundingClientRect() : {} as ClientRect;
    }

    private getTitleRect(): ClientRect {
        return (this.title.current) ? this.title.current!.getBoundingClientRect() : {} as ClientRect;
    }

    checkCursorStatus(e: React.MouseEvent){
        const boundingBox = this.getFrameRect();

        this.cursorX = e.clientX;
        this.cursorY = e.clientY;
  
        if (this.clicked) return;
  
        let hitRange = this.props.edgeDetectionRange;
        let hitTop = this.cursorY <= boundingBox.top + hitRange;
        let hitBottom = this.cursorY >= boundingBox.bottom - hitRange;
        let hitLeft = this.cursorX <= boundingBox.left + hitRange;
        let hitRight = this.cursorX >= boundingBox.right - hitRange;
  
        let cursor = 'auto';
  
        if (hitTop || hitBottom || hitLeft || hitRight){
            if (hitRight && hitBottom || hitLeft && hitTop) {
                cursor = 'nwse-resize';
            } else if (hitRight && hitTop || hitBottom && hitLeft) {
                cursor = 'nesw-resize';
            } else if (hitRight || hitLeft) {
                cursor = 'ew-resize';
            } else if (hitBottom || hitTop) {
                cursor = 'ns-resize';
            }
            e.stopPropagation();
        }
        else {
            const titleBounding = this.getTitleRect();
            if (this.cursorX > titleBounding.left && this.cursorX < titleBounding.right &&
                this.cursorY > titleBounding.top && this.cursorY < titleBounding.bottom) {
                cursor = 'move';
            }
        }
  
        this.hitEdges = {
            top: hitTop,
            bottom: hitBottom,
            left: hitLeft,
            right: hitRight
        }
  
        if (cursor !== this.state.cursor){
            this.setState({cursor:cursor})
        }
    }

    mouseDownListener(e: React.MouseEvent) {
        this.allowTransition = false;
        this.checkCursorStatus(e);
        const boundingBox = this.getFrameRect();
        this.clicked = {x: e.clientX, y: e.clientY, boundingBox: boundingBox,
                        frameTop: this.frame.current!.offsetTop, frameLeft: this.frame.current!.offsetLeft};
    }

    render() {
        const { title, onClose, onMaximize, onMinimize, minWidth, minHeight, children} = this.props;
  
        if (this.clicked) {
            let hits = this.hitEdges;
            const boundingBox = this.clicked.boundingBox;
    
            if (hits.top || hits.bottom || hits.left || hits.right) {
                if (hits.right) {
                    this.frameRect.width = Math.max(this.cursorX - boundingBox.left, minWidth);
                    this.windowRect.width = this.frameRect.width + 'px';
                }

                if (hits.bottom) {
                    this.frameRect.height = Math.max(this.cursorY - boundingBox.top, minHeight);
                    this.windowRect.height = this.frameRect.height + 'px';
                }
    
                if (hits.left) {
                    let currentWidth = boundingBox.right - this.cursorX;
                    if (currentWidth > minWidth) {
                        this.frameRect.width = currentWidth;
                        this.frameRect.left = this.clicked.frameLeft + this.cursorX - this.clicked.x;
                        this.windowRect.width = currentWidth + 'px';
                        this.windowRect.left = this.frameRect.left + 'px';
                    }
                }
    
                if (hits.top) {
                    let currentHeight = boundingBox.bottom - this.cursorY;
                    if (currentHeight > minHeight) {
                        this.frameRect.height = currentHeight;
                        this.frameRect.top = this.clicked.frameTop + this.cursorY - this.clicked.y;
                        this.windowRect.height = currentHeight + 'px';
                        this.windowRect.top = this.frameRect.top + 'px';
                    }
                }
            }
            else if (this.state.cursor === 'move'){
                this.frameRect.top = this.clicked.frameTop + this.cursorY - this.clicked.y;
                this.frameRect.left = this.clicked.frameLeft + this.cursorX - this.clicked.x;
                this.windowRect.top = this.frameRect.top + 'px';
                this.windowRect.left = this.frameRect.left + 'px';
            }
        }
  
        let cursor = this.state.cursor;
        return (
            <div ref={this.frame} 
                className={ windowClass('main') }
                style={{ cursor: cursor, ...this.windowRect }}
                onMouseDownCapture={this.mouseDownListener.bind(this)}
                onMouseMoveCapture={(e) => {
                    if (this.clicked !== null) {
                        e.preventDefault()
                    }
                }}
            >
                <TitleBar ref={this.title} title={title} cursor={cursor} onClose={onClose} onMinimize={onMinimize} onMaximize={onMaximize} />
                <div className={ windowClass('content') }>
                    {children}
                </div>
            </div>
        )
    }
}