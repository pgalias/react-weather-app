import React, { FunctionComponent } from 'react';
import { stringifyWindDirection } from '../../services';

import { ReactComponent as NorthArrow } from '../../../../assets/img/down-arrow.svg';
import { ReactComponent as NorthEastArrow } from '../../../../assets/img/down-left-arrow.svg';
import { ReactComponent as NorthWestArrow } from '../../../../assets/img/down-right-arrow.svg';
import { ReactComponent as SouthArrow } from '../../../../assets/img/up-arrow.svg';
import { ReactComponent as SouthEastArrow } from '../../../../assets/img/up-left-arrow.svg';
import { ReactComponent as SouthWestArrow } from '../../../../assets/img/up-right-arrow.svg';
import { ReactComponent as WestArrow } from '../../../../assets/img/right-arrow.svg';
import { ReactComponent as EastArrow } from '../../../../assets/img/left-arrow.svg';

type Props = {
  windFromDirection: number;
};

const windToIcon: Record<string, FunctionComponent> = {
  north: NorthArrow,
  'north east': NorthEastArrow,
  'north west': NorthWestArrow,
  south: SouthArrow,
  'south east': SouthEastArrow,
  'south west': SouthWestArrow,
  west: WestArrow,
  east: EastArrow,
};

export const WindIcon: FunctionComponent<Props> = ({ windFromDirection }) => {
  const windDirection = stringifyWindDirection(windFromDirection);
  const Icon = windToIcon[windDirection];

  return <Icon />;
};
