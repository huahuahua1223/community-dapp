import { isValidSuiAddress } from "@mysten/sui/utils";
import { suiClient } from "./index";
import { SuiObjectResponse, SuiEventFilter } from "@mysten/sui/client";
import { categorizeSuiObjects, CategorizedObjects } from "@/utils/assetsHelpers";
import { 
  MODULE_NAMES, 
  MEMBER_NFT_TYPE, 
  MEMBER_RECORD_TYPE,
  VALIDATORS_TYPE,
  VERSION_TYPE,
  EVENT_NAMES 
} from "./constants";
import { getContractConfig } from "./config";

// 获取用户的所有资产
export const getUserProfile = async (address: string): Promise<CategorizedObjects> => {
  if (!isValidSuiAddress(address)) {
    throw new Error("Invalid Sui address");
  }

  let hasNextPage = true;
  let nextCursor: string | null = null;
  let allObjects: SuiObjectResponse[] = [];

  while (hasNextPage) {
    const response = await suiClient.getOwnedObjects({
      owner: address,
      options: {
        showContent: true,
      },
      cursor: nextCursor,
    });

    allObjects = allObjects.concat(response.data);
    hasNextPage = response.hasNextPage;
    nextCursor = response.nextCursor ?? null;
  }

  return categorizeSuiObjects(allObjects);
};

// 获取用户的会员NFT
export const getMemberNFT = async (address: string): Promise<SuiObjectResponse | null> => {
  if (!isValidSuiAddress(address)) {
    throw new Error("Invalid Sui address");
  }

  const packageId = getContractConfig("testnet").Package;
  const memberType = MEMBER_NFT_TYPE(packageId);

  const objects = await suiClient.getOwnedObjects({
    owner: address,
    options: {
      showContent: true,
      showType: true,
    },
  });

  const memberObject = objects.data.find(obj => 
    obj.data?.content?.dataType === "moveObject" && 
    obj.data?.content?.type === memberType
  );

  return memberObject || null;
};

// 获取会员记录对象
export const getMemberRecord = async (): Promise<SuiObjectResponse | null> => {
  const packageId = getContractConfig("testnet").Package;
  const recordID = getContractConfig("testnet").Member;
  const recordType = MEMBER_RECORD_TYPE(packageId);
  
  try {
    const record = await suiClient.getObject({
      id: recordID,
      options: {
        showContent: true,
        showType: true,
      },
    });
    
    if (record.data?.content?.dataType === "moveObject" && 
        record.data?.content?.type === recordType) {
      return record;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch member record:", error);
    return null;
  }
};

// 获取验证器对象
export const getValidators = async (): Promise<SuiObjectResponse | null> => {
  const packageId = getContractConfig("testnet").Package;
  const validatorsID = getContractConfig("testnet").Validators;
  const validatorsType = VALIDATORS_TYPE(packageId);
  
  try {
    const validators = await suiClient.getObject({
      id: validatorsID,
      options: {
        showContent: true,
        showType: true,
      },
    });
    
    if (validators.data?.content?.dataType === "moveObject" && 
        validators.data?.content?.type === validatorsType) {
      return validators;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch validators:", error);
    return null;
  }
};

// 获取版本对象
export const getVersion = async (): Promise<SuiObjectResponse | null> => {
  const packageId = getContractConfig("testnet").Package;
  const versionID = getContractConfig("testnet").Version;
  const versionType = VERSION_TYPE(packageId);
  
  try {
    const version = await suiClient.getObject({
      id: versionID,
      options: {
        showContent: true,
        showType: true,
      },
    });
    
    if (version.data?.content?.dataType === "moveObject" && 
        version.data?.content?.type === versionType) {
      return version;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch version:", error);
    return null;
  }
};

// 获取会员创建事件
export const getMintMemberEvents = async () => {
  try {
    const events = await suiClient.queryEvents({
      query: {
        MoveEventType: `${getContractConfig("testnet").Package}::${MODULE_NAMES.MEMBER}::${EVENT_NAMES.MINT_MEMBER}`,
      },
    });
    return events.data;
  } catch (error) {
    console.error("Failed to fetch mint member events:", error);
    return [];
  }
};

// 获取会员删除事件
export const getDropMemberEvents = async () => {
  try {
    const events = await suiClient.queryEvents({
      query: {
        MoveEventType: `${getContractConfig("testnet").Package}::${MODULE_NAMES.MEMBER}::${EVENT_NAMES.DROP_MEMBER}`,
      },
    });
    return events.data;
  } catch (error) {
    console.error("Failed to fetch drop member events:", error);
    return [];
  }
};

// 获取会员编辑事件
export const getEditMemberEvents = async () => {
  try {
    const events = await suiClient.queryEvents({
      query: {
        MoveEventType: `${getContractConfig("testnet").Package}::${MODULE_NAMES.MEMBER}::${EVENT_NAMES.EDIT_MEMBER}`,
      },
    });
    return events.data;
  } catch (error) {
    console.error("Failed to fetch edit member events:", error);
    return [];
  }
};

// 获取支付事件
export const getPaymentEvents = async () => {
  try {
    const events = await suiClient.queryEvents({
      query: {
        MoveEventType: `${getContractConfig("testnet").Package}::${MODULE_NAMES.MEMBER}::${EVENT_NAMES.PAYMENT}`,
      },
    });
    return events.data;
  } catch (error) {
    console.error("Failed to fetch payment events:", error);
    return [];
  }
};

// 获取特定会员的所有相关事件
export const getMemberAllEvents = async (memberID: string) => {
  try {
    const [mintEvents, dropEvents, editEvents, paymentEvents] = await Promise.all([
      getMintMemberEvents(),
      getDropMemberEvents(),
      getEditMemberEvents(),
      getPaymentEvents(),
    ]);

    // 过滤出与特定会员相关的事件
    return {
      mint: mintEvents.filter(event => {
        const eventData = event.parsedJson as any;
        return eventData.member === memberID;
      }),
      drop: dropEvents.filter(event => {
        const eventData = event.parsedJson as any;
        return eventData.member === memberID;
      }),
      edit: editEvents.filter(event => {
        const eventData = event.parsedJson as any;
        return eventData.member === memberID;
      }),
      payment: paymentEvents.filter(event => {
        const eventData = event.parsedJson as any;
        return eventData.sender === memberID;
      }),
    };
  } catch (error) {
    console.error("Failed to fetch member all events:", error);
    return {
      mint: [],
      drop: [],
      edit: [],
      payment: [],
    };
  }
};
