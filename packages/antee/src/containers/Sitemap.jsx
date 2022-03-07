import React, { useState, useEffect } from 'react';

const Sitemap = () => {
  let parseXml;
  const [xmldata, setXmldata] = useState({});

  if (window.DOMParser) {
    parseXml = function (xmlStr) {
      return new window.DOMParser().parseFromString(xmlStr, 'text/xml');
    };
  } else if (
    typeof window.ActiveXObject != 'undefined' &&
    new window.ActiveXObject('Microsoft.XMLDOM')
  ) {
    parseXml = function (xmlStr) {
      const xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = 'false';
      xmlDoc.loadXML(xmlStr);
      return xmlDoc;
    };
  } else {
    parseXml = function () {
      return null;
    };
  }
  const dataxml = parseXml(`<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://students.antoree.com</loc>
      <lastmod>2021-08-27</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://students.antoree.com/today</loc>
      <lastmod>2021-08-27</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
    <loc>https://students.antoree.com/today</loc>
    <lastmod>2021-08-27</lastmod>
    <priority>1.00</priority>
  </url>
    <url>
    <loc>https://students.antoree.com/today</loc>
    <lastmod>2021-08-27</lastmod>
    <priority>1.00</priority>
  </url>
  <url>
  <loc>https://students.antoree.com/today</loc>
  <lastmod>2021-08-27</lastmod>
  <priority>1.00</priority>
   </url>
    <url>
    <loc>https://students.antoree.com/today</loc>
    <lastmod>2021-08-27</lastmod>
    <priority>0.80</priority>
  </url>
  </urlset>`);
  useEffect(() => {
    setXmldata(dataxml);
  }, []);
  console.log(xmldata);

  return <div>ssk</div>;
};

export default Sitemap;
