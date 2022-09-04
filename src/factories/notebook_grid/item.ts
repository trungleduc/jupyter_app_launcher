import { DashboardCellView } from '../../token';
import { Panel, Widget } from '@lumino/widgets';
export class GridStackItem extends Panel {
  constructor(cellIdentity: string, cell: Widget, info?: DashboardCellView) {
    super();
    this.removeClass('lm-Widget');
    this.removeClass('p-Widget');
    this.addClass('grid-stack-item');
    const content = new Panel();
    content.addClass('grid-stack-item-content');
    cell.addClass('grid-item-widget');
    content.addWidget(cell);
    this.addWidget(content);
    this._cellOutput = cell;
    this._info = info;
    this.cellIdentity = cellIdentity;
  }
  readonly cellIdentity: string;

  get cellOutput(): Widget {
    return this._cellOutput;
  }

  get info(): DashboardCellView | undefined {
    return this._info;
  }

  private _info: DashboardCellView | undefined;
  private _cellOutput: Widget;
}
