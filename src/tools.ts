import { LabIcon } from '@jupyterlab/ui-components';
import { UUID } from '@lumino/coreutils';

export function iconFromText(content: string): LabIcon {
  const name = UUID.uuid4();
  const nameList = content.split(' ');
  let ini: string;

  if (nameList.length === 1) {
    ini = nameList[0].substring(0, 2);
  } else {
    ini = `${nameList[0].substring(0, 1)}${nameList[1].substring(0, 1)}`;
  }
  const svgstr = `<svg class="jp-al-app-icon" width="16" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><text x="0" y="16" fill="#000" style="font-size: 14px">${ini.toUpperCase()}</text></svg>`;
  return new LabIcon({
    name,
    svgstr: svgstr
  });
}

export function iconFromSvgString(svgstr: string): LabIcon {
  const name = UUID.uuid4();
  return new LabIcon({
    name,
    svgstr: svgstr
  });
}
