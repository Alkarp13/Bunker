import React from "react"
import { defaultTheme } from './DnR'

export class Button extends React.Component {
  constructor(props) {
    super(props)

  	this.state = {
  		hover: false,
  		down: false,
  	}
  }
  render() {
    const {
      style,
      hoverStyle,
      downStyle,
      children,
      cursor,
      ...other
    } = this.props

    const dragging = /resize$/.test(cursor)

  	const buttonStyle = {
  		...style,
  		...(this.state.hover && !dragging ? hoverStyle : {}),
  		...(this.state.down && !dragging ? downStyle : {}),
      cursor
  	};

  	return (
  		<button
  			onMouseEnter={()=>this.setState({hover:true})}
  			onMouseLeave={()=>this.setState({hover:false,down:false})}
  			onMouseDown={()=>this.setState({down:true})}
  			onMouseUp={()=>this.setState({down:false})}
  			style={buttonStyle}
  			{...other}>
  			{children}
  		</button>)
  }
}

export function TitleBar(props) {
	return (
		<div>
			<div {...props.buttons}>
				<Button {...props.button1} cursor={props.dnrState.cursor}>
					{props.button1Children}
				</Button>
				<Button {...props.button2} cursor={props.dnrState.cursor}>
					{props.button2Children}
				</Button>
				<Button {...props.button3} cursor={props.dnrState.cursor}>
					{props.button3Children}
				</Button>
			</div>
			{props.children}
		</div>
	)
}

export let WindowsTheme = ({title, onClose, onMinimize, onMaximize, titleBarColor = '#0095ff'}) => {
	const titleHeight = 25;
	const buttonRadius = 6;
	const fontSize = 14;
	const fontFamily = 'Helvetica, sans-serif';

	const style = {
			height: titleHeight,
	}

	const buttonStyle = {
		padding: 0,
		margin: 0,
		width: 25,
		height: 25,
		outline: 'none',
		border: 'none',
		textAlign: 'center'
	}

	const buttons = {
		style: {
			height: titleHeight,
			position: 'absolute',
			right: 0,
			margin: 0,
			display: 'flex',
			alignItems: 'center',
			verticalAlign: 'baseline',
		}
	}

	const closeButton = {
		style: {
			...buttonStyle,
		  fontSize: '20px',
		  fontWeight: 500,
		  lineHeight: '36px',
			backgroundColor: titleBarColor,
		},
		hoverStyle: {
			backgroundColor: '#ec6060'
		},
		downStyle: {
			backgroundColor: '#bc4040'
		},
		onClick: onClose
	}

	const minimizeButton = {
		style: {
			...buttonStyle,
			lineHeight: '22px',
			backgroundColor: titleBarColor,
		},
		hoverStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.1)'
		},
		downStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)'
		},
		onClick: onMinimize
	}

	const maximizeButton = {
		style: {
			...buttonStyle,
			lineHeight: '12px',
			backgroundColor: titleBarColor
		},
		hoverStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.1)',
		},
		downStyle: {
			backgroundColor: 'rgba(0, 0, 0, 0.2)',
		},
		onClick: onMaximize
	}
	return {
		theme: {
			title: {
				...defaultTheme.title,
				fontFamily: fontFamily,
				background: titleBarColor,
				color: 'rgba(0, 0, 0, 0.7)',
				fontSize: fontSize,
				height: titleHeight,
			},
			frame: {
				...defaultTheme.frame,
			},
		  transition: 'all 0.25s ease-in-out'
		},
		titleBar: (<TitleBar
				style={style}
				buttons={buttons}
				button1={minimizeButton}
				button2={maximizeButton}
				button3={closeButton}
				button1Children='‒'
				button2Children='□'
				button3Children='˟'>
					<div style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						{title}
					</div>
			</TitleBar>),
	}
}

export default WindowsTheme;