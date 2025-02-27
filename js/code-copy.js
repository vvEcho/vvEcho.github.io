// themes/tree/source/js/clipboard.js
document.addEventListener('DOMContentLoaded', function() {
    // 动态插入按钮
    var blocks = document.querySelectorAll('.highlight');
    blocks.forEach(function(block) {
        console.log(block);
        var btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = '复制';
        btn.setAttribute('aria-label', '复制代码');

        var td = block.querySelector('td');
        console.log(td);
        var preParentNode = td.parentNode;
        preParentNode.insertBefore(btn, td);

        // 复制逻辑
        btn.onclick = function() {
            var code = block.querySelector('pre').innerText;
            navigator.clipboard.writeText(code)
                .then(function() {
                    btn.textContent = '已复制';
                    setTimeout(function(){ btn.textContent = '复制'; }, 1500);
                }).catch(err => console.error('复制失败:', err));
        };
    });
});
