import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    // с заглавной буквы, так как компонент
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean
}

export const Icon = ({
    className, Svg, inverted, ...otherProps
}: IconProps) => (
    <Svg
        className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])}
        {...otherProps}
    />
);
