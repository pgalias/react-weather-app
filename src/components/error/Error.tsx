import React, { FunctionComponent } from 'react';

type Props = {
  message: string;
};

export const Error: FunctionComponent<Props> = ({ message }) => <div role="alert">{message}</div>;
