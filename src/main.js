const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
//把字符串变成对象
const xObject = JSON.parse(x)
const hashMap = xObject || [{
        logo: 'A',
        url: 'https://www.acfun.cn'
    },
    {
        logo: 'B',
        url: 'https://www.bilibili.com'
    }
]
const simplifyUrl = (url) => {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '') //删除 / 开头的内容
}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`<li>     
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close"><i class="iconfont icon-close"></i></div>
            </div>        
    </li>`).insertBefore($lastLi)
        console.log('li',$li)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index,1)
            render()
        })
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
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    })
    render()
    //以下会插入到+号后面
    // .appendTo($siteList)
})
window.onbeforeunload = () => {
    console.log('页面要关闭了')
    const string = JSON.stringify(hashMap) //把对象变成string
    // console.log(typeof hashMap)
    // console.log(hashMap)
    // console.log(typeof string)
    // console.log(string)
    localStorage.setItem('x', string)
}

$(document).on('keypress',(e)=> {
    // const key = e.key
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
        if(hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
        
    }
})