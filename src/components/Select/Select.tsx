import { SelectUnstyledOwnProps } from "@mui/base"
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled"
import PopperUnstyled from "@mui/base/PopperUnstyled"
import SelectUnstyled, {
  selectUnstyledClasses,
  SelectUnstyledProps,
  SelectUnstyledRootSlotProps,
} from "@mui/base/SelectUnstyled"
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded"
import { grey } from "@mui/material/colors"
import { styled } from "@mui/system"
import * as React from "react"
import { themeColor } from "../../styles/MuiTheme"

const Button = React.forwardRef(function Button<TValue extends {}>(
  props: SelectUnstyledRootSlotProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      {ownerState.open ? <UnfoldMoreRoundedIcon /> : <UnfoldMoreRoundedIcon />}
    </button>
  )
})

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({
    theme: {
      palette: { mode },
    },
  }) => `
    font-size: 0.875rem;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    padding: 12px;
    text-align: left;
    line-height: 1.5;
    color: ${mode === "dark" ? grey[300] : themeColor.primary.main};
    position: relative;

    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;

    &:hover {
      border-color: ${mode === "dark" ? grey[600] : grey[300]};
    }

    &.${selectUnstyledClasses.focusVisible} {
      border-color: ${themeColor.primary[400]};
      outline: 3px solid ${mode === "dark" ? themeColor.primary[500] : themeColor.primary[200]};
    }

    & > svg {
      font-size: 1rem;
      position: absolute;
      height: 100%;
      top: 0;
      right: 10px;
    }
    `
)

const StyledListbox = styled("ul")(
  ({
    theme: {
      palette: { mode },
    },
  }) => `
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    min-width: 320px;
    overflow: auto;
    outline: 0px;
    background: ${mode === "dark" ? grey[900] : "#fff"};
    color: ${mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${mode === "dark" ? grey[900] : grey[200]};
    `
)

export const Option = styled(OptionUnstyled)(
  ({
    theme: {
      palette: { mode },
    },
  }) => `
    list-style: none;
    padding: 8px;
    cursor: default;
    border-radius: 4px;

    &:last-of-type {
      border-bottom: none;
    }

    &.${optionUnstyledClasses.selected} {
      background-color: ${mode === "dark" ? themeColor.primary.dark : themeColor.primary.light}61;
      color: ${mode === "dark" ? themeColor.primary.light : themeColor.primary.dark};
    }

    &.${optionUnstyledClasses.highlighted} {
      background-color: ${mode === "dark" ? grey[800] : grey[300]};
      color: ${mode === "dark" ? grey[300] : grey[900]};
    }

    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${mode === "dark" ? themeColor.primary.dark : themeColor.primary.light}61;
      color: ${mode === "dark" ? themeColor.primary.light : themeColor.primary.dark};
    }

    &.${optionUnstyledClasses.disabled} {
      color: ${mode === "dark" ? grey[700] : grey[400]};
    }

    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${mode === "dark" ? grey[800] : grey[300]};
      color: ${mode === "dark" ? grey[300] : grey[900]};
    }
    `
)

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`

export const Select = React.forwardRef(function CustomSelect<TValue extends {}>(
  props: SelectUnstyledProps<TValue>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const components: SelectUnstyledOwnProps<TValue>["components"] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  }

  return <SelectUnstyled {...props} ref={ref} components={components} />
})
