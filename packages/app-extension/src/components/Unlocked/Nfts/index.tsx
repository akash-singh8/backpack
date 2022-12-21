import { useMemo } from "react";
import type { Blockchain, NftCollection } from "@coral-xyz/common";
import { Loading } from "@coral-xyz/react-common";
import {
  nftCollectionsWithIds,
  useActiveWallets,
  useEnabledBlockchains,
  useLoader,
} from "@coral-xyz/recoil";
import { Image as ImageIcon } from "@mui/icons-material";
import {
  RecoilValue,
  selectorFamily,
  UnwrapRecoilValue,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";

import { useIsONELive } from "../../../hooks/useIsONELive";
import { EmptyState } from "../../common/EmptyState";
import {} from "../Balances";

import EntryONE from "./EntryONE";
import { NftTable } from "./NftTable";

export function Nfts() {
  const isONELive = useIsONELive();
  const { contents, state } = useRecoilValueLoadable(nftCollectionsWithIds);
  const isLoading = state === "loading";
  const collections = (state === "hasValue" && contents) || {};

  const NFTList = useMemo(() => {
    return (
      <NftTable
        prependItems={
          isONELive
            ? [{ height: 129, key: "oneEntry", component: <EntryONE /> }]
            : []
        }
        blockchainCollections={Object.entries(collections)}
      />
    );
  }, [isONELive, collections]);

  const isEmpty =
    false || (Object.values(collections).flat().length === 0 && !isLoading);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {isEmpty ? (
        <>
          {isONELive && <EntryONE />}
          <EmptyState
            icon={(props: any) => <ImageIcon {...props} />}
            title={"No NFTs"}
            subtitle={"Get started with your first NFT"}
            buttonText={"Browse Magic Eden"}
            onClick={() => window.open("https://magiceden.io")}
            verticallyCentered={!isONELive}
          />
        </>
      ) : (
        <div style={{ display: "flex", flex: 1, position: "relative" }}>
          {NFTList}
        </div>
      )}
    </div>
  );
}