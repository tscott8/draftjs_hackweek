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
const { ItalicButton, BoldButton, MonospaceButton, UnderlineButton,
  StrikethroughButton, ParagraphButton, BlockquoteButton, CodeButton,
  OLButton, ULButton, H1Button, H2Button, H3Button, H4Button, H5Button,
  H6Button, AlignLeftButton, AlignCenterButton, AlignRightButton} = richButtonsPlugin;
const { CharCounter, WordCounter, LineCounter } = counterPlugin;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Build some custom constants
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const plugins = [linkifyPlugin, blockBreakoutPlugin, richButtonsPlugin, counterPlugin, autoListPlugin];
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
const MyInlineMenuItem = ({ toggleInlineStyle, isActive, label, inlineStyle, onSelect }) =>
  <MenuItem bsClass="small" onClick={toggleInlineStyle} onSelect={onSelect} active={isActive ? true : false} eventKey={label}>
    {label}
  </MenuItem>;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Custom block style buttons
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
const MyBlockMenuItem = ({toggleBlockType, isActive, label, blockType, onSelect}) =>
  <MenuItem bsClass="small" onClick={toggleBlockType} onSelect={onSelect} active={isActive ? true : false} >
    {label}
  </MenuItem>

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StyleMap
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

};
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
  _onAlignCenterClick() {
    const {editorState} = this.state
    this.onChange(RichUtils.toggleInlineStyle(
    editorState,'text-align: center'));
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
              <StrikethroughButton><MyInlinePicButton src="text-strike.png"/></StrikethroughButton>
              {/*<Button bsSize="small" onClick={this._onAlignLeftClick.bind(this)}><Glyphicon glyph="align-left"/></Button>
              <Button bsSize="small" onClick={this._onAlignCenterClick.bind(this)}><Glyphicon glyph="align-center"/></Button>*/}
              <AlignLeftButton><MyBlockIconButton glyph="align-left"/></AlignLeftButton>
              <AlignCenterButton><MyBlockIconButton glyph="align-center"/></AlignCenterButton>
              <AlignRightButton><MyBlockIconButton glyph="align-right"/></AlignRightButton>
              <ULButton><MyBlockIconButton glyph="list"/></ULButton>
              <OLButton><MyBlockPicButton src="ordered-list.png"/></OLButton>
              <DropdownButton bsSize="small" title={font}>
                <MenuItem eventKey={'ARIAL'} onSelect={this._onFontSelect.bind(this)}>Arial</MenuItem>
                <MenuItem eventKey={'COMICSANS'} onSelect={this._onFontSelect.bind(this)}>Comic Sans MS</MenuItem>
                <MenuItem eventKey={'OPERATOR'} onSelect={this._onFontSelect.bind(this)}>Operator</MenuItem>
                <MonospaceButton><MyInlineMenuItem/></MonospaceButton>
              </DropdownButton>
              <DropdownButton bsSize="small" title={size}>
                <MenuItem eventKey={8} onSelect={this._onSizeSelect.bind(this)}>8pt</MenuItem>
                <MenuItem eventKey={10} onSelect={this._onSizeSelect.bind(this)}>10pt</MenuItem>
                <MenuItem eventKey={12} onSelect={this._onSizeSelect.bind(this)}>12pt</MenuItem>
                <MenuItem eventKey={14} onSelect={this._onSizeSelect.bind(this)}>14pt</MenuItem>
                <MenuItem eventKey={18} onSelect={this._onSizeSelect.bind(this)}>18pt</MenuItem>
                <MenuItem eventKey={24} onSelect={this._onSizeSelect.bind(this)}>24pt</MenuItem>
                <MenuItem eventKey={36} onSelect={this._onSizeSelect.bind(this)}>36pt</MenuItem>
                <MenuItem eventKey={48} onSelect={this._onSizeSelect.bind(this)}>48pt</MenuItem>
              </DropdownButton>
              <DropdownButton bsSize="small" title={header}>
                <ParagraphButton><MyBlockMenuItem/></ParagraphButton>
                <BlockquoteButton><MyBlockMenuItem/></BlockquoteButton>
                <CodeButton><MyBlockMenuItem/></CodeButton>
                <H1Button><MyBlockMenuItem/></H1Button>
                <H2Button><MyBlockMenuItem/></H2Button>
                <H3Button><MyBlockMenuItem/></H3Button>
                <H4Button><MyBlockMenuItem/></H4Button>
                <H5Button><MyBlockMenuItem/></H5Button>
                <H6Button><MyBlockMenuItem/></H6Button>
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
