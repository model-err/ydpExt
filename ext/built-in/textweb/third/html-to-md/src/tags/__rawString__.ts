import { ParseOptions, TagName } from '../type'
import { extraEscape, unescapeStr } from '../utils'
import isIndependentTag from '../utils/isIndependentTag'

class __RawString__ {
  tagName: TagName
  nextTagName: TagName
  prevTagName: TagName
  parentTag: TagName
  keepSpace: boolean
  calcLeading: boolean
  inTable: boolean
  leadingSpace: string
  layer: number
  rawStr: string
  constructor(
    str: string,
    tagName: TagName = '__nomatch__',
    {
      keepSpace = false,
      prevTagName = '',
      nextTagName = '',
      parentTag = '',
      calcLeading = false,
      layer = 1,
      leadingSpace = '',
      inTable = false,
    }: ParseOptions = {}
  ) {
    this.tagName = tagName
    this.nextTagName = nextTagName
    this.prevTagName = prevTagName
    this.parentTag = parentTag
    this.keepSpace = keepSpace
    this.calcLeading = calcLeading
    this.leadingSpace = leadingSpace
    this.layer = layer
    this.rawStr = str
    this.inTable = inTable
  }

  slim(str: string) {
    if (this.keepSpace) return str

    let _str = str.replace(/\s+/g, ' ')

    if (isIndependentTag(this.prevTagName)) {
      _str = _str.trimLeft()
    }
    if (isIndependentTag(this.nextTagName)) {
      _str = _str.trimRight()
    }
    return _str
  }

  beforeReturn(content: string) {
    // fix no unescape for raw string
    content = unescapeStr(content);

    if (this.keepSpace) return content
    if (content.trim().length==0) return '';
    if (this.calcLeading) {
      return this.leadingSpace + extraEscape(content)
    }
    let validStr = extraEscape(content)
    
    // fix inTable
    if (this.inTable) {
      validStr = ` ${validStr} `.replace(/[\n\r]/g,' ').replace(/(?<=[^\\])[\|]/g, '\\|').trim();
    }
   
    if (this.inTable) return validStr.trim();

    return validStr
  }

  exec() {
    let content = this.rawStr
    content = this.slim(content)
    content = this.beforeReturn(content)
    return content
  }
}

export default __RawString__
