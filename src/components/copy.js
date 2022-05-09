import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { useState } from "react";

const Copy = ({ text }) => {
  const [copied, setCopied] = useState(false);

  return (
    <span>
      <CopyToClipboard text={`I am interested to buy: ${text}.`} onCopy={() => setCopied(true)}>
        <button className="text-2xl">
          {copied ? <span className="text-green-500"><HiCheck /></span> : null}
          {!copied ? (<HiOutlineClipboardCopy />) : null}
        </button>
      </CopyToClipboard>

      
    </span>
  );
};

export default Copy;
