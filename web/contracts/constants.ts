import { SUI_CLOCK_OBJECT_ID } from "@mysten/sui/utils";

// 合约模块名称
export const MODULE_NAMES = {
  MEMBER: "member",
  VERSION: "version",
} as const;

// 事件名称
export const EVENT_NAMES = {
  MINT_MEMBER: "MintMemberEvent",
  DROP_MEMBER: "DropMemberEvent",
  EDIT_MEMBER: "EditMemberEvent",
  PAYMENT: "PaymentEvent",
} as const;

// 系统对象ID
export const SYSTEM_OBJECTS = {
  CLOCK: SUI_CLOCK_OBJECT_ID,
} as const;

// 会员费用(1 SUI)
export const MEMBERSHIP_FEE = 1_000_000_000;

// 会员NFT类型
export const MEMBER_NFT_TYPE = (packageId: string) => 
  `${packageId}::${MODULE_NAMES.MEMBER}::Member`;

// 会员记录类型
export const MEMBER_RECORD_TYPE = (packageId: string) =>
  `${packageId}::${MODULE_NAMES.MEMBER}::MemberRecord`;

// 规则类型
export const VALIDATORS_TYPE = (packageId: string) =>
  `${packageId}::${MODULE_NAMES.VERSION}::Validators`;

// 版本类型
export const VERSION_TYPE = (packageId: string) =>
  `${packageId}::${MODULE_NAMES.VERSION}::Version`;
