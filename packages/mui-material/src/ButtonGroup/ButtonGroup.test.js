import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from 'test/utils';
import ButtonGroup, { buttonGroupClasses as classes } from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroupContext from './ButtonGroupContext';

describe('<ButtonGroup />', () => {
  const { render } = createRenderer();

  describeConformance(
    <ButtonGroup>
      <Button>Conformance?</Button>
    </ButtonGroup>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      refInstanceof: window.HTMLDivElement,
      testComponentPropWith: 'span',
      muiName: 'MuiButtonGroup',
      testVariantProps: { variant: 'contained' },
      skip: ['componentsProp'],
    }),
  );

  it('should render with the root class but no others', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    expect(buttonGroup).to.have.class(classes.root);
    expect(buttonGroup).not.to.have.class(classes.contained);
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
  });

  it('should render an outlined button', () => {
    const { getByRole } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class('MuiButton-outlined');
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(classes.groupedOutlined);
    expect(button).to.have.class(classes.groupedOutlinedPrimary);
    expect(button).not.to.have.class(classes.groupedOutlinedSecondary);
  });

  it('can render an outlined primary button', () => {
    const { getByRole } = render(
      <ButtonGroup color="primary">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class('MuiButton-outlinedPrimary');
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(classes.groupedOutlined);
    expect(button).to.have.class(classes.groupedOutlinedPrimary);
    expect(button).not.to.have.class(classes.groupedOutlinedSecondary);
  });

  it('can render a contained button', () => {
    const { getByRole } = render(
      <ButtonGroup variant="contained">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class('MuiButton-contained');
    expect(button).to.have.class(classes.grouped);
    expect(button).to.have.class(classes.groupedContained);
    expect(button).to.have.class(classes.groupedContainedPrimary);
    expect(button).not.to.have.class(classes.groupedContainedSecondary);
  });

  it('can render a small button', () => {
    const { getByRole } = render(
      <ButtonGroup size="small">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class('MuiButton-outlinedSizeSmall');
  });

  it('can render a large button', () => {
    const { getByRole } = render(
      <ButtonGroup size="large">
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class('MuiButton-outlinedSizeLarge');
  });

  it('should have a ripple by default', () => {
    const { container } = render(
      <ButtonGroup>
        <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
      </ButtonGroup>,
    );
    expect(container.querySelector('.touchRipple')).not.to.equal(null);
  });

  it('can disable the elevation', () => {
    const { getByRole } = render(
      <ButtonGroup disableElevation>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    expect(button).to.have.class('MuiButton-disableElevation');
  });

  it('can disable the ripple', () => {
    const { container } = render(
      <ButtonGroup disableRipple>
        <Button TouchRippleProps={{ classes: { root: 'touchRipple' } }}>Hello World</Button>
      </ButtonGroup>,
    );
    expect(container.querySelector('.touchRipple')).to.equal(null);
  });

  it('should not be fullWidth by default', () => {
    const { container, getByRole } = render(
      <ButtonGroup>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const button = getByRole('button');
    const buttonGroup = container.firstChild;
    expect(buttonGroup).not.to.have.class(classes.fullWidth);
    expect(button).not.to.have.class('MuiButton-fullWidth');
  });

  it('can pass fullWidth to Button', () => {
    const { container, getByRole } = render(
      <ButtonGroup fullWidth>
        <Button>Hello World</Button>
      </ButtonGroup>,
    );
    const buttonGroup = container.firstChild;
    const button = getByRole('button');
    expect(buttonGroup).to.have.class(classes.fullWidth);
    expect(button).to.have.class('MuiButton-fullWidth');
  });

  it('should forward the context to children', () => {
    let context;
    render(
      <ButtonGroup size="large" variant="contained">
        <ButtonGroupContext.Consumer>
          {(value) => {
            context = value;
          }}
        </ButtonGroupContext.Consumer>
      </ButtonGroup>,
    );
    expect(context.variant).to.equal('contained');
    expect(context.size).to.equal('large');
    expect(context.fullWidth).to.equal(false);
    expect(context.disableRipple).to.equal(false);
    expect(context.disableFocusRipple).to.equal(false);
    expect(context.disableElevation).to.equal(false);
    expect(context.disabled).to.equal(false);
    expect(context.color).to.equal('primary');
  });
});
