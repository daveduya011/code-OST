module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                  @import "@/scss/_variables.scss";
                  @import "~bootstrap/scss/bootstrap";
                `
            }
        }
    },
    publicPath: '/'
}
