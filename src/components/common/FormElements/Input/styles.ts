import styled, { css } from 'styled-components'

interface IContainer {
  error?: boolean
  isDisabled?: boolean
}

export const Container = styled.label<IContainer>`
  width: 100%;
  margin-bottom: 16px;
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    background-color: #ffffff;
    border: 1px solid #dedede;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    font-size: 16px;
    line-height: 24px;
    color: #343434;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &[type='number'] {
      -moz-appearance: textfield;
    }
    ::placeholder {
      color: #9a9a9a;
      opacity: 1;
    }
    :-ms-input-placeholder {
      color: #9a9a9a;
    }
    ::-ms-input-placeholder {
      color: #9a9a9a;
    }

    ${({ error }) =>
      error &&
      css`
        &,
        &:focus {
          border-color: #ee0000;
        }
      `}
  }
  ${({ isDisabled }) =>
    isDisabled
      ? css`
          opacity: 0.6;
          user-select: none;
        `
      : css`
          input {
            &:hover {
              border-color: #177bc4;
            }
            &:focus {
              border-color: #177bc4;
              box-shadow: inset 0 0 0 1px #177bc4;
            }
          }
        `}
`
