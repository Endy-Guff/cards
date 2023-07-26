import type { Meta } from '@storybook/react'

import { Typography } from './'

const meta = {
  title: 'Components/Typography',
  component: Typography.H1,
} satisfies Meta<typeof Typography.H1>

export default meta

export const AllTypography = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography.Large>Large</Typography.Large>
      <Typography.H1>H1</Typography.H1>
      <Typography.H2>H2</Typography.H2>
      <Typography.H3>H3</Typography.H3>
      <Typography.Subtitle1>Subtitle1</Typography.Subtitle1>
      <Typography.Subtitle2>Subtitle2</Typography.Subtitle2>
      <Typography.Body1>Body1</Typography.Body1>
      <Typography.Body2>Body2</Typography.Body2>
      <Typography.Caption>Caption</Typography.Caption>
      <Typography.Overline>Overline</Typography.Overline>
      <Typography.Link1>Link1</Typography.Link1>
      <Typography.Link2>Link2</Typography.Link2>
    </div>
  ),
}

export const TypographyH1WithComponent = {
  render: () => <Typography.H1 component={'a'}>H1 with component</Typography.H1>,
}

export const TypographyH1WithMargin = {
  render: () => (
    <Typography.H1 mt={20} ml={35}>
      H1 with margin
    </Typography.H1>
  ),
}
