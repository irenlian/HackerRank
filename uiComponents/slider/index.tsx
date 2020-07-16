const App = () => {
    const { t } = useTranslation();
    const setSpreadAction = useAction(changeSpread);
    const spread = useSelector(getSpreadFilter);

    // we use a local state for the slider so it can move freely, and then pair it with a debounced Saga for optimal UX performance
    const [localSpread, setLocalSpread] = useState(spread.lte || spread.gte || 0);
    const operator = spread.gte ? ComparisonOperatorSigns.greaterThan : ComparisonOperatorSigns.lessThan;

    const changeOperator = () => {
        if (spread?.gte) {
            setSpreadAction({
                lte: spread.gte,
            });
        } else if (spread?.lte) {
            setSpreadAction({
                gte: spread.lte,
            });
        }
    };

    const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSpreadValue = Number(e.target.value);
        setLocalSpread(newSpreadValue);
        if (spread.gte) {
            setSpreadAction({
                gte: newSpreadValue,
            });
        } else {
            setSpreadAction({
                lte: newSpreadValue,
            });
        }
    };

    return (<Slider
        value={localSpread}
        inputPrefix={t(Locale.currency.dollar)}
        onChange={numberChange}
        minRange={0}
        maxRange={100}
        showComparisonOperator
        operator={operator}
        onOperatorClick={changeOperator}
        colorful
    />);
}
