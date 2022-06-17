const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
//把字符串变成对象
const xObject = JSON.parse(x)
const hashMap = xObject || [{
        logo: 'A',
        logoType: 'text',
        url: 'https://www.acfun.cn'
    },
    {
        logo: './images/bilibili.png',
        logoType: 'image',
        url: 'https://www.bilibili.com'
    }
]

function render() {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach(node => {
        const $li = $(`<li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${node.url}</div>
            </div>
        </a>
    </li>`).insertBefore($lastLi)
    })
}
render()
$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是啥？')
    if (url.indexOf('http') !== 0) {
        // alert('请输入http开头的网址')
        url = 'https://' + url
    }
    console.log(url)
    hashMap.push({
        logo: url[0],
        logoType: 'text',
        url: url
    })
    render()
    //以下会插入到+号后面
    // .appendTo($siteList)
})
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)//把对象变成string
    // console.log(typeof hashMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
    localStorage.setItem('x',string)
}