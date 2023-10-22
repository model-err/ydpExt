import Tag from '../Tag'
import { TagOptions } from '../type'

class Strong extends Tag {
  constructor(str: string, tagName = 'strong', options: TagOptions) {
    super(str, tagName, options)
    this.layer = 1
    this.match = this.match || '**'
  }

  beforeMergeSpace(content: string) {
    // fix '** a**' '****' '**  **'
    if (content.trim().length==0) return '';
    return ' '+this.match + content.trim() + this.match+' ';
  }

  exec(prevGap = '', endGap = '') {
    if (
      this.match != null &&
      this.prevTagStr &&
      !this.prevTagStr.endsWith('\\' + this.match[0]) &&
      this.prevTagStr.endsWith(this.match[0])
    )
      prevGap = ' '
    return super.exec(prevGap, endGap)
  }
}

export default Strong
