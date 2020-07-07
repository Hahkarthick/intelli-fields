const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const settings = {
    distPath: path.join(__dirname, "dist"),
    srcPath: path.join(__dirname, "src")
};

function srcPathExtend(subpath) {
    return path.join(settings.srcPath, subpath)
}


module.exports = (env, options) => {
    const envMode = options.mode;
    const isDevMode = options.mode === "development";

    return {
        entry: './example/index.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index_bundle.js',
            publicPath: "/",    // added this line
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.css$/,
                    include: /node_modules/,
                    loaders: ['style-loader', 'css-loader'],

                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require("autoprefixer")()
                                ],
                                sourceMap: isDevMode
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "static/fonts/[name].[ext]",
                        },
                    },
                },
                {
                    test: /\.(jp(e*)g|png|gif|svg|ico)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                sourceMap: isDevMode
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            // new CleanWebpackPlugin([settings.distPath], {
            //     verbose: true
            // }),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: srcPathExtend("index.html")
            }),
        ],
        devServer: {
            historyApiFallback: true,
            host: "localhost",
            port: 3000,
            https: true
        }
    }
}