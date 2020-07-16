import styled from 'styled-components';
import { ICONS } from '~/lib/assets';
import Button from '~/components/button';

const Colors = {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    TUNDORA: '#4A4A4A',
    WHITE_SMOKE: '#EFEFEF',

    // Greys light to dark
    ALABASTER: '#F9F9F9',
    GRAY_NURSE: '#f8f9f8',
    ALTO: '#DADADA',
    SILVER: '#cccccc',
    DUSTY_GRAY: '#979797',
    DOVE_GRAY: '#6F6F6F',

    GREEN_HAZE: '#08a05c',
    HOKI: '#607f96',
    PURE_BLUE: '#008EFF',
    LIME_GREEN: '#08A05C',
};

export const RowContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 10px 0;

    button {
        margin-right: 5px;
    }
`;

export const OperatorButton = styled(Button)`
    min-width: 20px;
    padding: 0 5px;
    border: 1px solid ${Colors.DUSTY_GRAY};
    border-radius: 2px;
`;

export const InputContainer = styled.div`
    border: 1px solid ${Colors.DUSTY_GRAY};
    border-radius: 2px;
    padding: 0 5px;
    min-width: 68px;

    input {
        border: none;
        height: 28px;

        &:focus {
            border: none;
            outline: none;
        }
    }

    // to hide arrow controls
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }
`;

export const SliderStyled = styled.input<{ percent: number; colorful?: boolean }>`
    margin-left: 10px;
    border-radius: 5px;
    height: 8px;
    width: 250px;
    -webkit-appearance: none;
    background: ${props =>
    props.colorful
        ? `linear-gradient(${Colors.ALTO},${Colors.ALTO}) right/${100 - props.percent}% 100%,
                linear-gradient(90deg, ${Colors.LIME_GREEN} 0%, ${Colors.PURE_BLUE} ${props.percent}%)`
        : `linear-gradient(to right, ${Colors.TUNDORA} ${props.percent}%, ${Colors.ALTO} ${props.percent}% 100%)`};
    background-repeat: no-repeat;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;

        width: 30px;
        height: 30px;

        cursor: pointer;
        background: ${Colors.WHITE};
        background-image: url(${ICONS.sortFilled});
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        background-size: 25%;
        transform: rotate(0.25turn);

        border-radius: 150px;
        border: 1px solid ${Colors.DUSTY_GRAY};
        box-shadow: 0 0 0 2px #fff;
    }

    &::-moz-range-thumb {
        width: 30px;
        height: 30px;

        cursor: pointer;
        background: ${Colors.WHITE};
        background-image: url(${ICONS.sortFilled});
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: center;
        background-size: 25%;
        transform: rotate(0.25turn);

        border-radius: 150px;
        border: 1px solid ${Colors.DUSTY_GRAY};
        box-shadow: 0 0 0 2px #fff;
    }

    &:focus {
        outline: none;
    }
`;
