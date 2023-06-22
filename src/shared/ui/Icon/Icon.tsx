import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    // с заглавной буквы, так как компонент
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export const Icon = ({ className, Svg }: IconProps) => (
    <Svg className={classNames(cls.Icon, {}, [className])} />
);
