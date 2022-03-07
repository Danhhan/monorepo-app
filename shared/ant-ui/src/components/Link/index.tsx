import React, { MouseEvent } from 'react';
import { EuiLink, EuiLinkProps } from '@elastic/eui';
import { useHistory } from 'react-router-dom';

export type LinkProps = EuiLinkProps & {
  to: string;
  onClick?: () => void;
};

const isModifiedEvent = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const isLeftClickEvent = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => event.button === 0;

const isTargetBlank = (
  event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const target = event.currentTarget.getAttribute('target');
  return target && target !== '_self';
};

function Link({ to, onClick, ...rest }: LinkProps): JSX.Element {
  const history = useHistory();

  function onClickHandler(
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) {
    if (event.defaultPrevented) {
      return;
    }

    // Let the browser handle links that open new tabs/windows
    if (
      isModifiedEvent(event) ||
      !isLeftClickEvent(event) ||
      isTargetBlank(event)
    ) {
      return;
    }

    onClick?.();

    // Prevent regular link behavior, which causes a browser refresh.
    event.preventDefault();

    // Push the route to the history.
    history.push(to);
  }

  // Generate the correct link href (with basename accounted for)
  const href: string | any = history.createHref({ pathname: to });

  return <EuiLink {...rest} href={href} onClick={onClickHandler} />;
}

export { Link };
