import { Deserializable } from './deserializable';

export class Activity {
  _id:string;
  type:string = 'activity';
  name:string;
  color:string;

  lastEvent():string {
    if(this.events.length === 0) {
      return undefined
    }
    function compare(a, b) {
      return b.time.localeCompare(a.time)
    }
    var events = this.events.sort(compare)
    return this.events[0].time
  }
}