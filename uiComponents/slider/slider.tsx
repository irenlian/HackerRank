import React, { useState } from 'react';

import { RowContainer, SliderStyled, InputContainer, OperatorButton } from './slider.styled';

enum ComparisonOperatorSigns {
    greaterThan = '≥',
    lessThan = '≤',
}

interface SliderProps {
    value: number;
    onChange: React.ChangeEventHandler;
    maxRange?: number;
    minRange?: number;
    inputPrefix?: string;
    showComparisonOperator?: boolean;
    operator?: ComparisonOperatorSigns;
    onOperatorClick?: React.MouseEventHandler;
    colorful?: boolean;
}

const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    maxRange = 100,
    minRange = 0,
    showComparisonOperator = true,
    inputPrefix = '',
    operator,
    onOperatorClick,
    colorful,
}) => {
    const operatorComp = showComparisonOperator ? (
        <OperatorButton variant="outlined" shape="square" onClick={onOperatorClick}>
            {operator}
        </OperatorButton>
    ) : null;

    const [isEmpty, setIsEmpty] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Just not to show '0' during editing
        if (!isEmpty && e.target.value.length === 0) {
            setIsEmpty(true);
        } else if (isEmpty && e.target.value.length > 0) {
            setIsEmpty(false);
        }

        onChange(e);
    };

    const handleFocus = () => {
        if (value === minRange && !isEmpty) {
            setIsEmpty(true);
        }
    };

    const handleBlur = () => {
        if (value === minRange && isEmpty) {
            setIsEmpty(false);
        }
    };

    return (
        <RowContainer>
            {operatorComp}

            <InputContainer>
                {inputPrefix}
                <input
                    type="number"
                    min={minRange}
                    max={maxRange}
                    value={isEmpty ? '' : value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    step="1"
                />
            </InputContainer>

            <SliderStyled
                type="range"
                min={minRange}
                max={maxRange}
                value={value}
                onChange={onChange}
                percent={(value / maxRange) * 100}
                colorful={colorful}
            />
        </RowContainer>
    );
};

export default Slider;
