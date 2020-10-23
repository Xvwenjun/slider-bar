window.addEventListener('load', function() {
        //先加载，这里不要忘记啦！！！
        var focus = document.querySelector('.focus'); //获取包裹着整个轮播图的盒子
        var ul = focus.querySelector('ul'); //获取图片框ul，里面的每个li包含着一张图片
        var ol = document.querySelector('ol'); //获取包裹着索引小圆点的盒子
        var arrl = document.querySelector('.arr-left'); //获取左箭头元素
        var arrr = document.querySelector('.arr-right'); //获取右箭头元素
        var imgWidth = ul.children[0].offsetWidth; //获取图片的宽度
        var index = 0; //为小圆点创建索引值
        var timer = null;
        var flag = true;

        //1、鼠标经过显示,清除定时器；离开隐藏，开启定时器
        focus.addEventListener('mouseover', function() {
            clearInterval(timer);
            timer = null;
            ol.style.display = 'block';
            arrl.style.display = 'block';
            arrr.style.display = 'block';

        })
        focus.addEventListener('mouseout', function() {
            ol.style.display = 'none';
            arrl.style.display = 'none';
            arrr.style.display = 'none';
            timer = setInterval(function() {
                arrr.click();
            }, 2000);
        })


        //2、动态添加小圆点，并为其添加索引
        for (var i = 0; i < ul.children.length; i++) {
            var li = document.createElement('li')
            ol.append(li);
            li.setAttribute('index', i);

            //  3、为小圆点添加点击事件，点击为current，图片滑动

            li.addEventListener('click', function() {
                //图片滑动
                index = this.getAttribute('index');
                console.log(index);
                //注意自定义属性的获取规则！！！
                // console.log(index);边做边测试，看输出的index是否正确
                animate(ul, -imgWidth * index, function() {

                });
                circleChange()
            })


        }
        //为第一个小圆点添加current类名
        ol.children[0].className = 'current';

        //克隆第一张图片放在ul的最后：
        var firstImg = ul.children[0].cloneNode(true);
        ul.appendChild(firstImg);



        //点击左右的箭头，图片轮播，小圆点相应变化

        arrl.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (index == 0) {
                    index = ul.children.length - 1;
                    ul.style.left = -imgWidth * index + 'px';
                }
                index--;
                animate(ul, -index * imgWidth, function() {
                    flag = true;
                });
                circleChange();
            }


        })

        arrr.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (index == ol.children.length) {
                    ul.style.left = 0;
                    index = 0;
                }
                index++;

                animate(ul, -imgWidth * index, function() {
                    flag = true;
                });
                circleChange();

            }

        })

        //小圆点的变化封装为函数
        function circleChange() {
            index = index < ol.children.length ? index : 0;
            //如果小点索引值等于小圆点个数，就为其赋值为0.
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[index].className = 'current';
            // console.log(index);
        }
    }


)