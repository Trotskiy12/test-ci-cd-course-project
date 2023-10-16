import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    // с заглавной буквы, так как компонент
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean
}

export const Icon = ({ className, Svg, inverted }: IconProps) => (
    <Svg className={classNames(inverted ? cls.inverted : cls.Icon, {}, [className])} />
);
