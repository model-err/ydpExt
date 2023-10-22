import Tag from '../Tag'
import { TagOptions } from '../type'

class Em extends Tag {
  constructor(str: string, tagName = 'em', options: TagOptions) {
    super(str, tagName, options)
    this.match = this.match || '*'
  }

  beforeMergeSpace(content: string) {
    // fix '* a*' '**' '* *'
    if (content.trim().length==0) return '';
    return ' '+this.match + content.trim() + this.match+' ';
  }

  exec(prevGap = '', endGap = '') {
    if (this.parentTag === 'strong' && this.nextTagStr) endGap = ' '
    if (
      this.match != null &&
      this.prevTagStr &&
      !this.prevTagStr.endsWith('\\' + this.match) &&
      this.prevTagStr.endsWith(this.match)
    )
      prevGap = ' '
    return super.exec(prevGap, endGap)
  }
}

export default Em
