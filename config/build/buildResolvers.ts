import webpack from 'webpack';

// функция для resolvers
export function buildResolvers(): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
    }
}