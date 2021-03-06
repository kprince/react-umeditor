var React = require('react');
var Dropdown = require('../base/Dropdown.react');
var {ColorTypes} = require('../../constants/EditorConstants');

var ColorDropdown = React.createClass({
	getInitialState:function(){
		return {
			handle:function(){}
		}
	},
	open:function(position,handle){
		this.setState({
			handle:handle
		})
		this.refs.root.open(position);
	},
	close:function(){
		this.refs.root.close();
	},
	toggle:function(position){
		this.refs.root.toggle(position);
	},
	handleSelectColor:function(e){
		e = e || event;
		var target = e.target || e.srcElement;
		var color = target.getAttribute('data-color');
		if(this.state.handle){
			this.state.handle(e,color);
		}
		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble = true;
		}
		this.close();
	},
	render:function(){
		var handleSelectColor = this.handleSelectColor;
		return (<Dropdown ref="root" className="color-dropdown">
				<table>
					<tbody>
					<tr className="title-row" key={"title-row"}>
						<td colSpan={10}>主题颜色</td>
					</tr>
					{
						ColorTypes.themeColors.map(function(colors,pos){
							var firstRow = pos==0;
							return (<tr key={pos} className={firstRow?"first-row":""}>
										{
											colors.map(function(color,index){
												return (<td key={index}>
														<a className="color-anchor"  data-color={color} style={{"backgroundColor":color}} onClick={handleSelectColor}></a>
												</td>)
											})
										}
									</tr>)
						})
					}
					<tr className="title-row" key={"title-row2"}>
						<td colSpan={10}>标准颜色</td>
					</tr>	
					<tr className="last-row" key={"last-row"}>
					{
						ColorTypes.standardColors.map(function(color,pos){
								return (<td key={pos}>
										<a className="color-anchor"  data-color={color} style={{"backgroundColor":color}} onClick={handleSelectColor}></a>
								</td>)
						})		  
				    }
					</tr>
					</tbody>
				</table>
		</Dropdown>)
	}
})
		
module.exports = ColorDropdown;