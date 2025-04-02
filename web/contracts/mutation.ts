import { bcs } from "@mysten/sui/bcs";
import { createBetterTxFactory } from "./index";
import { 
  MODULE_NAMES, 
  SYSTEM_OBJECTS,
  MEMBERSHIP_FEE 
} from "./constants";

// 链下验证
export const offChainValidation = createBetterTxFactory(
  (tx, networkVariables, {
    sig,
    value,
  }: {
    sig: number[],
    value: any,
  }) => {
    tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.VERSION}::off_chain_validation`,
      typeArguments: [
        `${networkVariables.Package}::${MODULE_NAMES.VERSION}::OffChainValidator`,
      ],
      arguments: [
        tx.pure(bcs.vector(bcs.u8()).serialize(sig).toBytes()),
        tx.pure(value),
      ],
    });
    
    return tx;
  }
);

// 铸造会员NFT
export const mintMember = createBetterTxFactory(
  (tx, networkVariables, { 
    sig,
    name, 
    avatar, 
    introduction, 
  }: { 
    sig: number[],
    name: string, 
    avatar: string, 
    introduction: string,
  }) => {
    // 创建支付交易
    const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(MEMBERSHIP_FEE)]);
    
    // 调用Member模块的Pay函数
    const [receipt] = tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.MEMBER}::Pay`,
      arguments: [
        tx.object(networkVariables.MemberRecord), // MemberRecord对象
        coin, // 支付的SUI代币
      ],
    });

    // 调用mint_member函数
    tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.MEMBER}::mint_member`,
      arguments: [
        tx.object(networkVariables.MemberRecord), // MemberRecord对象
        tx.pure(bcs.vector(bcs.u8()).serialize(sig).toBytes()),
        tx.pure.string(name),
        tx.pure.string(avatar),
        tx.pure.string(introduction),
        tx.object(networkVariables.Version), // Version对象
        tx.object(SYSTEM_OBJECTS.CLOCK), // 系统时钟对象
        tx.object(receipt), // 支付收据
      ],
    });
    
    return tx;
  }
);

// 更新会员信息
export const updateMember = createBetterTxFactory(
  (tx, networkVariables, { 
    memberID,
    name, 
    avatar, 
    introduction,
    sig, 
  }: { 
    memberID: string,
    name?: string, 
    avatar?: string, 
    introduction?: string, 
    sig: number[],
  }) => {
    // 调用edit_member函数
    tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.MEMBER}::edit_member`,
      arguments: [
        tx.object(memberID), // Member对象
        name ? tx.pure.string(name) : tx.pure.vector("string", []), // 使用空向量代替none
        avatar ? tx.pure.string(avatar) : tx.pure.vector("string", []),
        introduction ? tx.pure.string(introduction) : tx.pure.vector("string", []),
        tx.pure(bcs.vector(bcs.u8()).serialize(sig).toBytes()),
        tx.object(networkVariables.Version), // Version对象
        tx.object(SYSTEM_OBJECTS.CLOCK), // 系统时钟对象
      ],
    });
    
    return tx;
  }
);

// 删除会员
export const dropMember = createBetterTxFactory(
  (tx, networkVariables) => {
    // 调用drop_member函数
    tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.MEMBER}::drop_member`,
      arguments: [
        tx.object(networkVariables.MemberRecord), // MemberRecord对象
        tx.object(networkVariables.Member), // Member对象
        tx.object(networkVariables.Version), // Version对象
      ],
    });
    
    return tx;
  }
);

// 添加积分
export const addPoints = createBetterTxFactory(
  (tx, networkVariables, { 
    memberID,
    sig,
    points,
  }: { 
    memberID: string,
    sig: number[],
    points: number,
  }) => {
    // 调用add_points函数
    tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.MEMBER}::add_points`,
      arguments: [
        tx.object(memberID), // Member对象
        tx.object(networkVariables.Version), // Version对象
        tx.pure(bcs.vector(bcs.u8()).serialize(sig).toBytes()),
        tx.pure.u64(points),
        tx.object(SYSTEM_OBJECTS.CLOCK), // 系统时钟对象
      ],
    });
    
    return tx;
  }
);

// 更新积分
export const updatePoints = createBetterTxFactory(
  (tx, networkVariables, { 
    memberID,
  }: { 
    memberID: string,
  }) => {
    // 调用update_points函数
    tx.moveCall({
      target: `${networkVariables.Package}::${MODULE_NAMES.MEMBER}::update_points`,
      arguments: [
        tx.object(networkVariables.MemberRecord), // MemberRecord对象
        tx.object(memberID), // Member对象
        tx.object(networkVariables.Version), // Version对象
      ],
    });
    
    return tx;
  }
);