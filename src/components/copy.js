import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { HiOutlineClipboardCopy, HiCheck } from "react-icons/hi";
import { useState } from "react";

const Copy = ({ text }) => {
  const [copied, setCopied] = useState(false);

  return (
    <span>
      <CopyToClipboard text={`I am interested to buy: ${text}.`} onCopy={() => setCopied(true)}>
        <button className="text-2xl bg-blue-300 border rounded px-2 py-1">
          {copied ? <span className="text-green-500"><HiCheck className="inline-block" /> <span className="text-sm">copied</span></span> : null}
          {!copied ? (<span><HiOutlineClipboardCopy className="inline-block" /><span className="text-sm">Copy</span></span>) : null}
        </button>
      </CopyToClipboard>

      
    </span>
  );
};

export default Copy;
