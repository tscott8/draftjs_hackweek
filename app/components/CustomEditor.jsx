import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  DropdownButton,
  MenuItem,
  Glyphicon,
} from 'react-bootstrap';
import Draft from 'draft-js';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
const {EditorState, ContentState} = Draft;
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createRichButtonsPlugin from 'draft-js-richbuttons-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();
const blockBreakoutPlugin = createBlockBreakoutPlugin();
const richButtonsPlugin = createRichButtonsPlugin();
const counterPlugin = createCounterPlugin();

const { ItalicButton, BoldButton, MonospaceButton, UnderlineButton, StrikethroughButton,
  ParagraphButton, BlockquoteButton, CodeButton, OLButton, ULButton,
  H1Button, H2Button, H3Button, H4Button, H5Button, H6Button } = richButtonsPlugin;
const { CharCounter, WordCounter, LineCounter} = counterPlugin;
const plugins = [ hashtagPlugin, linkifyPlugin, blockBreakoutPlugin, richButtonsPlugin, counterPlugin];
const text = `This editor has counters below!
Try typing here and watch the numbers go up. 🙌

Note that the color changes when you pass one of the following limits:
- 200 characters
- 30 words
- 10 lines
`;

const MyInlineCustomIconButton = ({src, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown }) =>
<Button
  bsSize="small"
  onClick={toggleInlineStyle}
  onMouseDown={onMouseDown}
  bsStyle={isActive ? 'primary' : 'default'}
> <img height='15px' src={src} className={isActive ? 'activeImg' : 'inactiveImg'}/> </Button>;
const MyInlineIconButton = ({glyph, toggleInlineStyle, isActive, label, inlineStyle, onMouseDown }) =>
  <Button
    bsSize="small"
    onClick={toggleInlineStyle}
    onMouseDown={onMouseDown}
    bsStyle={isActive ? 'primary' : 'default'}
  > <Glyphicon glyph={glyph}/> </Button>;
const MyInlineButton = ({ toggleInlineStyle, isActive, label, inlineStyle }) =>
  <Button
    bsSize="small"
    onClick={toggleInlineStyle}
    bsStyle={isActive ? 'primary' : 'default'}
  > {label} </Button>;
const MyInlineMenuItem = ({ toggleInlineStyle, isActive, label, inlineStyle, onSelect }) =>
  <MenuItem
    bsClass="small"
    onClick={toggleInlineStyle}
    onSelect={onSelect}
    active={isActive ? true : false}
  > {label} </MenuItem>

// custom block buttons
const MyBlockCustomIconButton = ({src, toggleBlockType, isActive, label, blockType}) =>
<Button
  bsSize="small"
  onClick={toggleBlockType}
  bsStyle={isActive ? 'primary' : 'default'}
> <img height='15px' src={src} className={isActive ? 'activeImg' : 'inactiveImg'}/> </Button>;
const MyBlockIconButton = ({ glyph, toggleBlockType, isActive, label, blockType }) =>
  <Button
    bsSize="small"
    onClick={toggleBlockType}
    bsStyle={isActive ? 'primary' : 'default'}
  > <Glyphicon glyph={glyph}/></Button>;
const MyBlockButton = ({ toggleBlockType, isActive, label, blockType }) =>
  <Button
    bsSize="small"
    onClick={toggleBlockType}
    bsStyle={isActive ? 'primary' : 'default'}
  > {label} </Button>;
const MyBlockMenuItem = ({ toggleBlockType, isActive, label, blockType, onSelect }) =>
  <MenuItem
    bsClass="small"
    onClick={toggleBlockType}
    onSelect={onSelect}
    active={isActive ? true : false}
  > {label} </MenuItem>

  export default class CustomEditor extends Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {editorState: EditorState.createEmpty()};
    //   this.onChange = (editorState) => this.setState({editorState});
    // }
    constructor(props) {
      super(props);
      this.state = {editorState: createEditorStateWithText(text)};
      this.onChange = (editorState) => this.setState({ editorState });
      this.focus = () => this.refs.editor.focus();
    }
    _onStrikethroughClick() {
     this.onChange(RichUtils.toggleInlineStyle(
     this.state.editorState,
     'STRIKETHROUGH'
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
              <UnderlineButton><MyInlineCustomIconButton src="underline.png"/></UnderlineButton>
              <StrikethroughButton><MyInlineCustomIconButton src="text-strike.png"/></StrikethroughButton>
              <Button bsSize="small" ><Glyphicon glyph="align-left" /></Button>
              <Button bsSize="small" ><Glyphicon glyph="align-center" /></Button>
              <Button bsSize="small" ><Glyphicon glyph="align-right" /></Button>
              <Button bsSize="small" ><Glyphicon glyph="align-justify" /></Button>
              <ULButton><MyBlockIconButton glyph="list"/></ULButton>
              <OLButton><MyBlockCustomIconButton src="ordered-list.png"/></OLButton>
              <DropdownButton bsSize="small" title={font}>
                <MenuItem eventKey="1">Times New Roman</MenuItem>
                <MenuItem eventKey="2">Arial</MenuItem>
                <MonospaceButton><MyInlineButton/></MonospaceButton>
              </DropdownButton>
              <DropdownButton bsSize="small" title={size}>
                <MenuItem eventKey="8">8pt</MenuItem>
                <MenuItem eventKey="10">10pt</MenuItem>
                <MenuItem eventKey="12">12pt</MenuItem>
                <MenuItem eventKey="14">14pt</MenuItem>
                <MenuItem eventKey="18">18pt</MenuItem>
                <MenuItem eventKey="24">24pt</MenuItem>
                <MenuItem eventKey="36">36pt</MenuItem>
                <MenuItem eventKey="48">48pt</MenuItem>
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
            editorState={this.state.editorState}
            onChange={this.onChange}
            spellCheck={true}
            plugins={plugins}
            ref="editor"
          />
        </div>
        <div className="stats">
          <div><CharCounter limit={200} /> characters</div>
          <div><WordCounter limit={30} /> words</div>
          <div><LineCounter limit={10} /> lines</div>
        </div>
      </div>
    );
  }
}
