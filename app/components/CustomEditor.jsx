import React, {Component} from 'react';
import { Button, ButtonGroup, ButtonToolbar,
  DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import Draft from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Import the plugins
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';
import createAutoListPlugin from 'draft-js-autolist-plugin';

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initialize the plugins
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const linkifyPlugin = createLinkifyPlugin();
const blockBreakoutPlugin = createBlockBreakoutPlugin();
const richButtonsPlugin = createRichButtonsPlugin();
const counterPlugin = createCounterPlugin();
const autoListPlugin = createAutoListPlugin();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pull out neccesary Props
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const { EditorState, ContentState, RichUtils} = Draft;
const { ItalicButton, BoldButton, MonospaceButton,
  UnderlineButton, ParagraphButton, BlockquoteButton,
  CodeButton, OLButton, ULButton, H1Button, H2Button,
  H3Button, H4Button, H5Button, H6Button, } = richButtonsPlugin;
const { CharCounter, WordCounter, LineCounter } = counterPlugin;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Build some custom constants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const plugins = [linkifyPlugin, blockBreakoutPlugin,richButtonsPlugin,
  counterPlugin, autoListPlugin];
const limits = {chars: 200, words: 30, lines: 10};
const text = `This editor has counters below!
Try typing here and watch the numbers go up.

Note that the color changes when you pass one of the following limits:
- 200 characters
- 30 words
- 10 lines`;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom inline style buttons
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MyInlinePicButton = ({src, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown}) =>
  <Button bsSize="small" onClick={toggleInlineStyle} onMouseDown={onMouseDown} bsStyle={isActive ? 'primary' : 'default'} >
    <img height='15px' src={src} className={isActive ? 'activeImg' : 'inactiveImg'}/>
  </Button>;
const MyInlineIconButton = ({glyph, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown}) =>
  <Button bsSize="small" onClick={toggleInlineStyle} onMouseDown={onMouseDown} bsStyle={isActive ? 'primary' : 'default'} >
    <Glyphicon glyph={glyph}/>
  </Button>;
const MyInlineButton = ({ toggleInlineStyle, isActive, label, inlineStyle}) =>
  <Button bsSize="small" onClick={toggleInlineStyle} bsStyle={isActive ? 'primary' : 'default'} >
    {label}
  </Button>;
const MyInlineMenuItem = ({ toggleInlineStyle, isActive, label, inlineStyle, onSelect, eventKey}) =>
  <MenuItem bsClass="small" onClick={toggleInlineStyle} onSelect={onSelect} active={isActive ? true : false} eventKey={eventKey}>
    {label}
  </MenuItem>;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom block style buttons
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const MyBlockPicButton = ({src, toggleBlockType, isActive, label, blockType}) =>
<Button bsSize="small" onClick={toggleBlockType} bsStyle={isActive ? 'primary' : 'default'} >
  <img height='15px' src={src} className={isActive ? 'activeImg' : 'inactiveImg'}/>
</Button>;
const MyBlockIconButton = ({glyph, toggleBlockType, isActive, label, blockType}) =>
  <Button bsSize="small" onClick={toggleBlockType} bsStyle={isActive ? 'primary' : 'default'} >
    <Glyphicon glyph={glyph}/>
  </Button>;
const MyBlockButton = ({toggleBlockType, isActive, label, blockType}) =>
  <Button bsSize="small" onClick={toggleBlockType} bsStyle={isActive ? 'primary' : 'default'} >
    {label}
  </Button>;
const MyBlockMenuItem = ({toggleBlockType, isActive, label, blockType, onSelect, eventKey}) =>
  <MenuItem bsClass="small" onClick={toggleBlockType} onSelect={onSelect} active={isActive ? true : false} eventKey={eventKey}>
    {label}
  </MenuItem>

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StyleMap
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const styles = {
//   left: {textAlign:'left'},
//   center: {textAlign:'center'},
//   right: {textAlign:'right'},
//   just: {textAlign:'justify'}
// }
const styleMap = {
    FONT_SIZE_8: { fontSize: 8 },
    FONT_SIZE_10: { fontSize: 10 },
    FONT_SIZE_12: { fontSize: 12 },
    FONT_SIZE_14: { fontSize: 14 },
    FONT_SIZE_18: { fontSize: 18 },
    FONT_SIZE_24: { fontSize: 24 },
    FONT_SIZE_36: { fontSize: 36 },
    FONT_SIZE_48: { fontSize: 48 },
    FONT_OPERATOR: { fontFamily: 'Operator' },
    FONT_ARIAL: { fontFamily: 'Arial' },
    FONT_COMICSANS: { fontFamily: 'Comic Sans MS' },
    LEFT: { textAlign:'left'},
    CENTER: { textAlign:'center'},
    RIGHT: { textAlign:'right'},
    JUSTIFY: { textAlign:'justify'}
  };
// function getBlockStyle(block) {
//   switch (block.getType()) {
//     case 'alignjustify':
//         return [styles.justify];
//     case 'alignleft':
//         return [styles.left];
//     case 'aligncenter':
//         console.log({textAlign:"center"})
//         return [styles.center] ;
//     case 'alignright':
//         return [styles.right];
//     default:
//         return null;
//   }
// }
// const BLOCK_TYPES = [
//     { label: 'AlignLeft', style: 'alignleft' },
//     { label: 'AlignCenter', style: 'aligncenter' },
//     { label: 'AlignRight', style: 'alignright' },
//     { label: 'AlignJustify', style: 'alignjustify' },
// ];
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Build the custom editor class
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export default class CustomEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: createEditorStateWithText(text)};
    this.onChange = (editorState) => this.setState({ editorState });
    this.focus = () => this.refs.editor.focus();
  }
  //   //className is public-DraftEditor-content to change text alignment
  _onSizeSelect(eventKey) {
    const {editorState} = this.state
    const string = 'FONT_SIZE_' + eventKey
     this.onChange(RichUtils.toggleInlineStyle(
     editorState,
      string
   ));
 }
   _onFontSelect(eventKey) {
     const {editorState} = this.state
     const string = 'FONT_' + eventKey
      this.onChange(RichUtils.toggleInlineStyle(
      editorState,
       string
    ));
  }
  _onAlignmentClick(label) {
    const {editorState} = this.state
    const string = 'ALIGN_' + label
     this.onChange(RichUtils.toggleInlineStyle(
     editorState,
      string
   ));
 }

  render() {
    const size = <Glyphicon glyph="text-size" />
    const header = <Glyphicon glyph="header" />
    const font = <Glyphicon glyph="font" />
    const style = <Glyphicon glyph="pencil" />
    return (
      <div id="content">
        <h1>Draft.js Editor</h1>
        <div className="toolbar">
          <ButtonToolbar>
            <ButtonGroup>
              <BoldButton><MyInlineIconButton glyph="bold"/></BoldButton>
              <ItalicButton><MyInlineIconButton glyph="italic"/></ItalicButton>
              <UnderlineButton><MyInlinePicButton src="underline.png"/></UnderlineButton>
              <MyInlineIconButton label={'LEFT'} onClick={this._onAlignmentClick.bind(this)} glyph="align-left"/>
              <MyInlineIconButton label={'CENTER'} onClick={this._onAlignmentClick.bind(this)} glyph="align-center"/>
              <MyInlineIconButton label={'RIGHT'} onClick={this._onAlignmentClick.bind(this)}glyph="align-right"/>
              <MyInlineIconButton label={'JUSTIFY'} onClick={this._onAlignmentClick.bind(this)} glyph="align-justify"/>
              <ULButton><MyBlockIconButton glyph="list"/></ULButton>
              <OLButton><MyBlockPicButton src="ordered-list.png"/></OLButton>
              <DropdownButton bsSize="small" title={font}>
                <MyInlineMenuItem label={'Arial'} eventKey={'ARIAL'} onSelect={this._onFontSelect.bind(this)}/>
                <MyInlineMenuItem label={'Comic Sans MS'} eventKey={'COMICSANS'} onSelect={this._onFontSelect.bind(this)}/>
                <MyInlineMenuItem label={'Operator'} eventKey={'OPERATOR'} onSelect={this._onFontSelect.bind(this)}/>
                <MonospaceButton><MyInlineMenuItem eventKey={'MONOSPACE'}/></MonospaceButton>
              </DropdownButton>
              <DropdownButton bsSize="small" title={size}>
                <MyInlineMenuItem label={'8pt'} eventKey={8} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'10pt'} eventKey={10} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'12pt'} eventKey={12} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'14pt'} eventKey={14} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'18pt'} eventKey={18} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'24pt'} eventKey={24} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'36pt'} eventKey={36} onSelect={this._onSizeSelect.bind(this)}/>
                <MyInlineMenuItem label={'48pt'} eventKey={48} onSelect={this._onSizeSelect.bind(this)}/>
              </DropdownButton>
              <DropdownButton bsSize="small" title={header}>
                <ParagraphButton><MyBlockMenuItem eventKey={'PARAGRAPH'}/></ParagraphButton>
                <BlockquoteButton><MyBlockMenuItem eventKey={'BLOCKQUOTE'}/></BlockquoteButton>
                <CodeButton><MyBlockMenuItem eventKey={'CODE'}/></CodeButton>
                <H1Button><MyBlockMenuItem eventKey={'H1'}/></H1Button>
                <H2Button><MyBlockMenuItem eventKey={'H2'}/></H2Button>
                <H3Button><MyBlockMenuItem eventKey={'H3'}/></H3Button>
                <H4Button><MyBlockMenuItem eventKey={'H4'}/></H4Button>
                <H5Button><MyBlockMenuItem eventKey={'H5'}/></H5Button>
                <H6Button><MyBlockMenuItem eventKey={'H6'}/></H6Button>
              </DropdownButton>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div className="editor" onClick={ this.focus }>
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            spellCheck={true}
            plugins={plugins}
            ref="editor" />
        </div>
        <div className="stats">
          <div><CharCounter limit={limits.chars} /> characters</div>
          <div><WordCounter limit={limits.words} /> words</div>
          <div><LineCounter limit={limits.lines} /> lines</div>
        </div>
      </div>
    );
  }
}
