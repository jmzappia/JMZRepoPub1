<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>

  <xsl:template match="/LogExport">
	<html>
	  <body>
		<center><h2>FortiClient Logs :<xsl:value-of select="@time"/></h2></center><br/>
		<table border="1" style="white-space:nowrap;">
		  <thead>
			<tr>
			  <td>time</td>
			  <td>level</td>
			  <td>source</td>
			  <td>message</td>
			</tr>
		  </thead>
		  <tbody>
			<xsl:for-each select="log">
			  <tr>
				<td><xsl:value-of select="@time"/></td>
				<td>
					<xsl:choose>
						<xsl:when test="@level=0">Emergency</xsl:when>
						<xsl:when test="@level=1">Alert</xsl:when>
						<xsl:when test="@level=2">Critical</xsl:when>
						<xsl:when test="@level=3">Error</xsl:when>
						<xsl:when test="@level=4">Warning</xsl:when>
						<xsl:when test="@level=5">Notice</xsl:when>
						<xsl:when test="@level=6">Informational</xsl:when>
						<xsl:when test="@level=7">Debug</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@level"/>
						</xsl:otherwise>
					</xsl:choose>
				</td>
				<td>
					<xsl:choose>
						<xsl:when test="@source=1">AntiVirus</xsl:when>
						<xsl:when test="@source=2">VPN</xsl:when>
						<xsl:when test="@source=3">Scheduler</xsl:when>
						<xsl:when test="@source=4">Update</xsl:when>
						<xsl:when test="@source=5">Firewall</xsl:when>
						<xsl:when test="@source=6">WebFilter</xsl:when>
						<xsl:when test="@source=7">FortiManager</xsl:when>
						<xsl:when test="@source=8">AntiSpam</xsl:when>
						<xsl:when test="@source=9">FortiProxy</xsl:when>
						<xsl:when test="@source=10">AntiLeak</xsl:when>
						<xsl:when test="@source=11">WAN Optimization</xsl:when>
						<xsl:when test="@source=12">FortiShield</xsl:when>
						<xsl:when test="@source=13">AppDB</xsl:when>
						<xsl:when test="@source=14">App Detection</xsl:when>
						<xsl:when test="@source=15">Config</xsl:when>
						<xsl:when test="@source=16">SSLVPN</xsl:when>
						<xsl:when test="@source=17">ESNAC</xsl:when>
						<xsl:when test="@source=18">UI</xsl:when>
						<xsl:when test="@source=19">Vulnerability Scan</xsl:when>
						<xsl:when test="@source=20">SSOMA</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="@source"/>
						</xsl:otherwise>
					</xsl:choose>
				</td>
				<td><xsl:value-of select="."/></td>
			  </tr>
			</xsl:for-each>
		  </tbody>
		</table>
	  </body>
	</html>
  </xsl:template>
  
  
</xsl:stylesheet>
