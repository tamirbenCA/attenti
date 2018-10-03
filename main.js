'use strict'

import headerBar from './cmps/header.js'
import mainBoard from './cmps/mainBoard.js'

new Vue({
    template: `
        <section>
            <main-board />
        </section>
    `,
    // router: myRouter,
    components: {
        headerBar,
        mainBoard
    }
}).$mount('#app')