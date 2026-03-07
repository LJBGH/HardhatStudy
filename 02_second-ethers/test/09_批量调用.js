// Miso的合约审计漏洞分析
// 在delegate中使用msg.vale 导致重复判断
// 示例：
// -业务逻辑：当调用者调用conmmiitETH时，调用者会传递1wei给合约，合约地址会转移一个token给调用者

// -实际情况：调用者通过batch多次调用conmmitETH时，调用者只转移1wei到合约地址中，合约地址重复判断了mag.value,转移了多个token到调用者地址中
// 攻击者使用1wei，挖走了合约中的5个token

// -应对方式：
//      1. 白名单，禁止批量调用conmmitETH
//      2. 使用WETH，避免在delegateCall中依赖msg.value这样的全局变量